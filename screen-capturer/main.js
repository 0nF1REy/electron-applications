const { app, screen, desktopCapturer, shell, Tray, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const chokidar = require("chokidar");

let tray;

// Retorna o ícone correto dependendo do sistema operacional
function getTrayIconPath() {
  if (process.platform === "win32") return path.join(__dirname, "assets/capture.ico");
  if (process.platform === "darwin") return path.join(__dirname, "assets/capture.icns");
  return path.join(__dirname, "assets/capture.png");
}

// Função para capturar a tela
function captureScreen() {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width: screenSize.width, height: screenSize.height },
  }).then((sources) => {
    const img = sources[0].thumbnail.toPNG();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `screenshot-${timestamp}.png`;
    const filePath = path.join(os.homedir(), fileName);

    fs.writeFile(filePath, img, (err) => {
      if (!err) shell.openExternal(`file://${filePath}`);
    });
  });
}

// Cria o tray e define ações
function createTray() {
  const iconPath = getTrayIconPath();
  tray = new Tray(iconPath);

  // Clique direto para capturar a tela
  tray.on("click", () => {
    captureScreen();
  });

  // Menu de contexto do tray
  const contextMenu = Menu.buildFromTemplate([
    { label: "Quit", click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
}

// Hot reload do main + renderer
try {
  require("electron-reloader")(module, { debug: true, watchRenderer: true });
} catch (_) {
  console.log("Electron reloader não ativado.");
}

// Observa assets externos para recarregar renderer
const watcher = chokidar.watch([
  path.join(__dirname, "renderer/**/*"),
  path.join(__dirname, "assets/**/*"),
]);

watcher.on("change", (filePath) => {
  console.log(`Arquivo alterado: ${filePath}`);
});

// Inicializa app
app.whenReady().then(createTray);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (!tray) createTray();
});

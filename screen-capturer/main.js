const {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  desktopCapturer,
  shell,
  Tray,
  Menu,
} = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const chokidar = require("chokidar");

let mainWindow;
let tray;

function createWindow() {
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    x: screenWidth - 220,
    y: 20,
    alwaysOnTop: true,
    frame: true,
    focusable: true,
    skipTaskbar: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    // Mostra sem roubar foco
    mainWindow.showInactive();
  });

  // Tray
  const iconPath = path.join(__dirname, "assets/capture.ico");
  tray = new Tray(iconPath);

  tray.on("click", () => {
    if (mainWindow.isVisible()) mainWindow.hide();
    else mainWindow.show();
  });

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

// Observa assets externos
const watcher = chokidar.watch([
  path.join(__dirname, "renderer/**/*"),
  path.join(__dirname, "assets/**/*"),
]);

watcher.on("change", (filePath) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log(`Arquivo alterado: ${filePath}, recarregando renderer...`);
    mainWindow.webContents.reloadIgnoringCache();
  }
});

// Captura de tela
ipcMain.on("capture-screen", async () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const sources = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width: screenSize.width, height: screenSize.height },
  });

  const img = sources[0].thumbnail.toPNG();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `screenshot-${timestamp}.png`;
  const filePath = path.join(os.homedir(), fileName);

  fs.writeFile(filePath, img, (err) => {
    if (!err) shell.openExternal(`file://${filePath}`);
  });
});

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

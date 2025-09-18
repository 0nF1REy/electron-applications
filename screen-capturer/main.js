const { app, BrowserWindow, screen } = require("electron");
const chokidar = require("chokidar");
const path = require("path");

let mainWindow;

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
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });

  mainWindow.loadFile("index.html");

  // Mostra sem roubar foco
  mainWindow.once("ready-to-show", () => {
    mainWindow.showInactive();
  });
}

// Hot reload do main + renderer
try {
  require("electron-reloader")(module, {
    debug: true,
    watchRenderer: true,
  });
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

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

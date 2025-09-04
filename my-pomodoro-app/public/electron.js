const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");

const url = require("url");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "WorkFaster",
    width: 400,
    height: 400,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Caminho para o script de preload
      contextIsolation: true, // Mantém o contexto isolado
      nodeIntegration: false, // Desabilita o Node.js no renderer
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "../build/index.html"), // Conecta ao app React
    protocol: "file:",
    slashes: true,
  });

  // Botão de janela
  mainWindow.setWindowButtonVisibility(false);

  // Barra de menu
  mainWindow.setMenuBarVisibility(false);

  // Carrega o app na janela do Electron
  mainWindow.loadURL(startUrl);

  // Escuta pelo evento 'close-app'
  ipcMain.on("close-app", () => {
    app.quit();
  });
}

app.whenReady().then(createMainWindow);

// Fecha o app completamente (exceto no macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Reabre a janela se o app for ativado e não houver janelas abertas
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

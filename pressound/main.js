const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const player = require("play-sound")();

const audioCache = {};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "src", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "src", "index.html"));
};

// Evento de tocar som via IPC
ipcMain.on("play-sound", (event, soundPath) => {
  console.log('Recebido pedido para tocar som:', soundPath);
  const fullPath = path.join(__dirname, "src", soundPath);
  console.log('Caminho completo:', fullPath);

  if (audioCache[soundPath]) {
    audioCache[soundPath].kill();
  }

  audioCache[soundPath] = player.play(fullPath, (err) => {
    if (err) {
      console.error("Erro ao tocar som:", err);
    } else {
      console.log('Som tocado com sucesso:', soundPath);
    }
    audioCache[soundPath] = null;
  });
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

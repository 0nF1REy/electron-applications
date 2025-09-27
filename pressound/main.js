const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const player = require("play-sound")();

const audioCache = {};
let currentAudio = null;

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
  
  // Para o áudio atual se estiver tocando
  if (currentAudio) {
    currentAudio.kill();
    currentAudio = null;
  }

  // Para qualquer áudio em cache
  Object.keys(audioCache).forEach(key => {
    if (audioCache[key]) {
      audioCache[key].kill();
      audioCache[key] = null;
    }
  });

  const fullPath = path.join(__dirname, "src", soundPath);

  currentAudio = player.play(fullPath, (err) => {
    currentAudio = null;
  });
  
  audioCache[soundPath] = currentAudio;
});

// Evento para parar som via IPC
ipcMain.on("stop-sound", (event) => {
  
  if (currentAudio) {
    currentAudio.kill();
    currentAudio = null;
  }

  // Para qualquer áudio em cache
  Object.keys(audioCache).forEach(key => {
    if (audioCache[key]) {
      audioCache[key].kill();
      audioCache[key] = null;
    }
  });
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

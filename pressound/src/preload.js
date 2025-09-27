const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  playSound: (soundPath) => {
    ipcRenderer.send("play-sound", soundPath);
  },
  stopSound: () => {
    ipcRenderer.send("stop-sound");
  },
});

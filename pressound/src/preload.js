const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  playSound: (soundPath) => {
    console.log('Enviando som para main process:', soundPath);
    ipcRenderer.send("play-sound", soundPath);
  },
});

console.log('Preload script carregado com sucesso!');

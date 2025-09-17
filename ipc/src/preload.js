const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("openNewWindow", {
  openUrl: (url) => {
    ipcRenderer.send("openUrl", url);
  },
});

contextBridge.exposeInMainWorld("openFileApi", {
  openFile: () => {
    ipcRenderer.invoke("open-file");
  },
});

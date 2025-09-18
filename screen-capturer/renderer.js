const { ipcRenderer } = require("electron");

document.getElementById("capture-btn").addEventListener("click", () => {
  ipcRenderer.send("capture-screen");
});

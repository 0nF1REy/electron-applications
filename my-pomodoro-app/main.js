const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    title: "WorkFaster",
    width: 550,
    height: 550,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "build", "index.html"));
  }

  win.on("closed", () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

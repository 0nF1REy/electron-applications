import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { initDB } from "./database/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

async function createWindow() {
  db = await initDB();

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "renderer/index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC para o renderer
ipcMain.handle("db-query", async (event, sql, params = []) => {
  try {
    const stmt = await db.prepare(sql);
    const result = sql.trim().toLowerCase().startsWith("select")
      ? await stmt.all(params)
      : await stmt.run(params);
    await stmt.finalize();
    return result;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
});

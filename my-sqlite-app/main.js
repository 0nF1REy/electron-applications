import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { initDB } from "./database/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

async function createWindow() {
  try {
    db = await initDB();
    console.log("Database initialized successfully");

    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    win.loadFile(path.join(__dirname, "renderer/index.html"));
  } catch (error) {
    console.error("Error creating window:", error);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (db) {
      db.close();
    }
    app.quit();
  }
});

// IPC para o renderer
ipcMain.handle("db-query", async (event, sql, params = []) => {
  try {
    if (!db) {
      throw new Error("Database not initialized");
    }

    const stmt = await db.prepare(sql);
    const result = sql.trim().toLowerCase().startsWith("select")
      ? await stmt.all(params)
      : await stmt.run(params);
    await stmt.finalize();

    return result;
  } catch (err) {
    console.error("Database query error:", err);
    return { error: err.message };
  }
});

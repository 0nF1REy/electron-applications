import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  query: (sql, params) => ipcRenderer.invoke("db-query", sql, params),
});

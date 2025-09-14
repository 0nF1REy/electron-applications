import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class DB {
  constructor() {
    this.db = new Database(path.join(__dirname, "app.db"));
    this.createTable();
  }

  createTable() {
    const stmt = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )`;
    this.db.prepare(stmt).run();
  }

  query(sql, params = []) {
    if (sql.trim().toLowerCase().startsWith("select")) {
      return this.db.prepare(sql).all(params);
    } else {
      const info = this.db.prepare(sql).run(params);
      return info;
    }
  }
}

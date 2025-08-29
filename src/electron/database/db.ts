import path from "path";
import fs from "fs";
import Database from "better-sqlite3";

const dbPath =
    process.env.NODE_ENV === "development"
        ? "./demo_table.db"
        : path.join(process.resourcesPath, "./demo_table.db")

// Detect first run
const firstRun = !fs.existsSync(dbPath);

// Open (creates file if missing)
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
// Initialize schema if first run
if (firstRun) {
  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS schema_version (version INTEGER);
    INSERT INTO schema_version (version) VALUES (1);
  `);
  console.log("✅ Database created with schema v1");
}

// Migration example
const row = db.prepare("SELECT version FROM schema_version").get() as { version: number } | undefined;
let version = row ? row.version : 0;

if (version < 2) {
  db.exec(`
    ALTER TABLE users ADD COLUMN age INTEGER DEFAULT 0;
    UPDATE schema_version SET version = 2;
  `);
  console.log("✅ Migrated database to schema v2");
}

export default db;

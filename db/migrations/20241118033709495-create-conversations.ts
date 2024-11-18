import { Database } from 'better-sqlite3'

export const up = async (db: Database) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  db.exec(sql)
}

export const down = async (db: Database) => {
  const sql = `
    DROP TABLE IF EXISTS conversations
  `
  db.exec(sql)
}

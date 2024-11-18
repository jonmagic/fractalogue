import { Database } from 'better-sqlite3'

export const up = async (db: Database) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations (id) ON DELETE CASCADE
    )
  `
  db.exec(sql)
}

export const down = async (db: Database) => {
  const sql = `
    DROP TABLE IF EXISTS messages
  `
  db.exec(sql)
}

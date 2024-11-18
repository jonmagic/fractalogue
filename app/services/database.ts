import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

// Use import.meta.url to resolve the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve the path to the database file
const dbPath = path.resolve(__dirname, '../../db/database.sqlite3')

// Initialize the SQLite database
const db = new Database(dbPath, { verbose: console.log })

export default db

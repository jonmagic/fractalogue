import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createMigration = (name: string) => {
  if (!name) {
    console.error('Please provide a migration name.')
    process.exit(1)
  }

  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '')
  const filename = `${timestamp}-${name}.ts`
  const filepath = path.resolve(__dirname, './migrations', filename)

  const template = `
import { Database } from 'better-sqlite3'

export const up = async (db: Database) => {
  // Example: CREATE TABLE IF NOT EXISTS table_name ()
  const sql = ''
  db.exec(sql)
}

export const down = async (db: Database) => {
  // Example: DROP TABLE IF EXISTS table_name
  const sql = ''
  db.exec(sql)
}
`

  fs.writeFileSync(filepath, template.trim())
  console.log(`Migration created: ${filepath}`)
}

createMigration(process.argv[2])

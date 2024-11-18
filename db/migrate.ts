import path from 'path'
import { Umzug } from 'umzug'
import { fileURLToPath } from 'url'

// Dynamically resolve the `database.ts` file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const databasePath = path.resolve(__dirname, '../app/services/database.ts')

const db = (await import(databasePath)).default

// Add this after the db import
await db.exec(`
  CREATE TABLE IF NOT EXISTS migrations (
    name TEXT PRIMARY KEY,
    timestamp INTEGER NOT NULL
  )
`)

const umzug = new Umzug({
  migrations: {
    glob: path.resolve(__dirname, './migrations/*.ts'), // Path to migrations
    resolve: ({ name, path: migrationPath }) => ({
      name,
      up: async () => {
        const migration = await import(migrationPath!)
        return migration.up(db) // Pass `db` explicitly
      },
      down: async () => {
        const migration = await import(migrationPath!)
        return migration.down(db) // Pass `db` explicitly
      },
    }),
  },
  context: db,
  storage: {
    async executed(): Promise<string[]> {
      const results = db.prepare('SELECT name FROM migrations ORDER BY timestamp').all();
      return results.map((row: { name: string }) => row.name);
    },
    async logMigration({ name }: { name: string }): Promise<void> {
      db.prepare('INSERT INTO migrations (name, timestamp) VALUES (?, ?)').run(
        name,
        Date.now()
      );
    },
    async unlogMigration({ name }: { name: string }): Promise<void> {
      db.prepare('DELETE FROM migrations WHERE name = ?').run(name);
    },
  },
  logger: console,
})

const run = async () => {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'up': {
      await umzug.up()
      console.log('Migrations applied successfully')
      break
    }

    case 'down': {
      await umzug.down()
      console.log('Last migration reverted successfully')
      break
    }

    case 'status': {
      const executed = await umzug.executed()
      const pending = await umzug.pending()
      console.log('Executed migrations:', executed.map((m) => m.name))
      console.log('Pending migrations:', pending.map((m) => m.name))
      break
    }

    default: {
      console.log(`
Usage:
  migrate up       - Run all pending migrations
  migrate down     - Revert the last migration
  migrate status   - Show migration status
`)
      break
    }
  }
}

run().catch((err) => {
  console.error('Migration failed', err)
  process.exit(1)
})

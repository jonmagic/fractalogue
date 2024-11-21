import db from '~/lib/database'

export interface Conversation {
  id: number
  title: string
  created_at: string
}

export function getConversations(): Array<Conversation> {
  return db
    .prepare('SELECT * FROM conversations ORDER BY created_at DESC')
    .all() as Array<Conversation>
}

export function getConversation(id: number): Conversation | undefined {
  return db.prepare('SELECT * FROM conversations WHERE id = ?').get(id) as
    | Conversation
    | undefined
}

export function createConversation(title: string): Conversation {
  const result = db
    .prepare('INSERT INTO conversations (title) VALUES (?) RETURNING *')
    .get(title) as Conversation
  return result
}

export function updateConversation(
  id: number,
  title: string,
): Conversation | undefined {
  return db
    .prepare('UPDATE conversations SET title = ? WHERE id = ? RETURNING *')
    .get(title, id) as Conversation | undefined
}

export function deleteConversation(id: number): void {
  db.prepare('DELETE FROM conversations WHERE id = ?').run(id)
}

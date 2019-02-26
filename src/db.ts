import { connect, Db } from 'mongodb'

let MONGO_URI = 'mongodb://mongo:27017/agiletoolkit'
let db: Db

export async function dbConnect (): Promise<Db> {
  if (db) {
    return db
  }

  console.log('connecting to mongodb...')
  const client = await connect(MONGO_URI, { useNewUrlParser: true })
  db = client.db()
  console.log('connected to mongodb database:', db.databaseName)

  return db
}

export function getDb() {
  return db;
}
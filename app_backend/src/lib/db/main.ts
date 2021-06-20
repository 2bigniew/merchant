import sqlite3, { Database } from 'sqlite3'
import * as dotenv from 'dotenv'
import * as util from 'util'

dotenv.config({ path: `${__dirname}'/.env` })

export abstract class DB {
  protected db: Database
  protected dbName: string = process.env.DB_NAME || 'merchant_db_default'

  constructor() {
    sqlite3.verbose()
    this.db = new sqlite3.Database(this.dbName)
  }

  protected async get(query: string) {
    const get = util.promisify(this.db.get)
    return await get(query)
  }

  protected async run(query: string) {
    const run = util.promisify(this.db.run)
    return await run(query)
  }
}

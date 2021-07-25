import sqlite3, { Database } from 'sqlite3'
import * as dotenv from 'dotenv'
import path from 'path'
import { TableName } from '../../../contract'
import { SQLitiffy } from './helpers'

dotenv.config({ path: path.resolve('.env') })

export abstract class DB {
  protected db: Database
  protected dbName: string = getDbName()

  constructor() {
    sqlite3.verbose()
    this.db = new sqlite3.Database(this.dbName)
  }

  protected async get<T, R>(query: string, params?: R): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get(query, SQLitiffy<R>(params), (err, row) => {
        if (err) {
          reject(err)
        }

        resolve(row as T)
      })
    })
  }

  protected async all<T, R>(query: string, params?: R): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query, SQLitiffy<R>(params), (err, rows) => {
        if (err) {
          reject(err)
        }

        resolve(rows as T[])
      })
    })
  }

  protected async run<T, R>(query: string, params: R): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(query, SQLitiffy<R>(params), (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }

  protected async getLastId(tableName: TableName): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tableName} ORDER BY 1 DESC LIMIT 1`
      this.db.get(query, (err, row) => {
        if (err) {
          reject(err)
        }

        resolve(row ? row.id : 0)
      })
    })
  }
}

const getDbName = (): string => {
  if (process.env.MERCHANT_PROD === 'in_progress') {
    return process.env.PROD_DB_NAME!
  }

  if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) {
    return process.env.TEST_DB_NAME || 'merchant_db_test_default'
  }

  return process.env.DB_NAME || 'merchant_db_default'
}

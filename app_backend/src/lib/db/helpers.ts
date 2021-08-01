import { camelCase, snakeCase } from 'lodash'
import { DBObject } from '../../../contract'

export const prepareCreateProps = <T>(payload: T): { keys: string; values: string } => {
  const keys = []
  const values = []
  for (const [key, value] of Object.entries(payload)) {
    if (value) {
      keys.push(key)
      values.push(value)
    }
  }

  return {
    keys: keys.join(', '),
    values: values.join(', '),
  }
}

export const prepareUpdateProps = <T>(payload: T): string => {
  const pairs = []
  for (const [key, value] of Object.entries(payload)) {
    if (value) {
      pairs.push(`${key} = $${key}`)
    }
  }

  return pairs.join(', ')
}

export const SQLitiffy = <T>(payload: T | undefined): Record<string, string> | undefined => {
  if (!payload) {
    return
  }

  const sqliteObject: Record<string, string> = {}
  for (const [key, value] of Object.entries(payload)) {
    sqliteObject[`$${key}`] = value
  }
  return sqliteObject
}

export const getSQLitifiedKeysNames = <T>(payload: T | undefined): string => {
  if (!payload) {
    return ''
  }
  const sqliteKeys = []
  for (const key of Object.keys(payload)) {
    sqliteKeys.push(`$${key}`)
  }
  return sqliteKeys.join(', ')
}

export const mapJSObjectToDBFormat = <T>(obj: T): DBObject => {
  const dbObject: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    const dbKey = snakeCase(key)
    dbObject[dbKey] = obj[key as keyof T]
  }
  return dbObject
}

export const mapDBObjectToJSFormat = <T>(obj: DBObject | undefined): T | undefined => {
  if (!obj) {
    return
  }

  const object: { [prop: string]: any } = {}
  for (const key of Object.keys(obj)) {
    const jsKey = camelCase(key)
    object[jsKey] = obj[key]
  }
  return object as T
}

export const removeUndefined = <T>(arr: Array<T | undefined>): T[] =>
  arr.filter((el) => !!el) as T[]

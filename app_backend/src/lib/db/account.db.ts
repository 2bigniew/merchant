import { DB } from './main'
import { Account, CreateAccountPayload, UpdateAccountPayload } from '../../../contract/Account'
import { prepareUpdateProps } from './helpers'
import { TableName } from '../../../contract'

class AccountTable extends DB {
  constructor(private tableName: TableName = 'account') {
    super()
  }

  public async getAccounts(): Promise<Account[]> {
    const query = `SELECT * FROM ${this.tableName}`
    return await this.all<Account, undefined>(query)
  }

  public async getAccountsById(id: number): Promise<Account | undefined> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $id LIMIT 1`
    return await this.get<Account, { id: number }>(query, { id })
  }

  public async createAccount(payload: CreateAccountPayload): Promise<number> {
    const query = `INSERT INTO ${this.tableName} (firstname, lastname, password, email)
            VALUES ($firstname, $lastname, $password, $email);`
    await this.run<Account, CreateAccountPayload>(query, payload)
    return this.lastId()
  }

  public async updateAccount(payload: UpdateAccountPayload): Promise<Account | undefined> {
    const { id, ...rest } = payload
    const account = await this.getAccountsById(id)
    if (!account) {
      return
    }
    const updateString = prepareUpdateProps<Omit<UpdateAccountPayload, 'id'>>(rest)
    const query = `UPDATE ${this.tableName} SET ${updateString} WHERE id = $id;`
    await this.run<Account, UpdateAccountPayload>(query, payload)
    return this.getAccountsById(id)
  }

  public async deleteAccount(id: number): Promise<Account | undefined> {
    const account = await this.getAccountsById(id)
    if (!account) {
      return undefined
    }
    const query = `DELETE FROM ${this.tableName} WHERE id = $id;`
    await this.run<Account, { id: number }>(query, { id })
    return account
  }

  public async lastId(): Promise<number> {
    return this.getLastId(this.tableName)
  }
}

export default new AccountTable()

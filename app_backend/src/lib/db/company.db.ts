import { DB } from './main'
import { DBObject, TableName } from '../../../contract'
import { CreateCompanyPayload, Company, UpdateCompanyPayload } from '../../../contract/Company'
import {
  mapDBObjectToJSFormat,
  mapJSObjectToDBFormat,
  prepareCreateProps,
  prepareUpdateProps,
} from './helpers'

class CompanyTable extends DB {
  constructor(private tableName: TableName = 'company') {
    super()
  }

  public async getCompanies(): Promise<Company[]> {
    const query = `SELECT * FROM ${this.tableName}`
    const companies = await this.all<Company, undefined>(query)
    return companies.map((company) => mapDBObjectToJSFormat<Company>(company))
  }

  public async getCompanyById(id: number): Promise<Company | undefined> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $id LIMIT 1`
    const company = await this.get<Company, { id: number }>(query, { id })
    return mapDBObjectToJSFormat(company)
  }

  public async createCompany(payload: CreateCompanyPayload): Promise<number> {
    const dbPayload = mapJSObjectToDBFormat(payload)
    const { keys, values } = prepareCreateProps(dbPayload)
    const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${values});`
    await this.run<Company, DBObject>(query, dbPayload)
    return this.lastId()
  }

  public async updateCompany(payload: UpdateCompanyPayload): Promise<Company | undefined> {
    const dbPayload = mapJSObjectToDBFormat(payload)
    const { id, ...rest } = dbPayload
    const company = await this.getCompanyById(id)
    if (!company) {
      return
    }
    const updateString = prepareUpdateProps<Omit<UpdateCompanyPayload, 'id'>>(rest)
    const query = `UPDATE ${this.tableName} SET ${updateString} WHERE id = $id;`
    await this.run<Company, DBObject>(query, dbPayload)
    return this.getCompanyById(id)
  }

  public async deleteCompany(id: number): Promise<Company | undefined> {
    const company = await this.getCompanyById(id)
    if (!company) {
      return undefined
    }
    const query = `DELETE FROM ${this.tableName} WHERE id = $id;`
    await this.run<Company, { id: number }>(query, { id })
    return company
  }

  public async lastId(): Promise<number> {
    return this.getLastId(this.tableName)
  }
}

export default new CompanyTable()

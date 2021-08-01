import initDB from '../../src/lib/db/init'
import CompanyTable from '../../src/lib/db/company.db'
import AccountTable from '../../src/lib/db/account.db'
import { Company, CreateCompanyPayload, UpdateCompanyPayload } from '../../contract/Company'

const createCompanyData = (accountId: number): Omit<Company, 'id' | 'createdAt'>[] => [
  {
    accountId,
    name: 'Otcom',
    street: 'Hallows',
    buldingNumber: '9',
    locality: '1',
    postalCode: '18-500',
    city: 'Kolno',
    country: 'Poland',
    nip: '1789442890',
    bankAccount: '32168545031438073902',
    bankName: 'Stim Bank',
  },
  {
    accountId,
    name: 'Namfix',
    street: 'Redwing',
    buldingNumber: '03',
    locality: '5',
    postalCode: '90-360',
    city: 'Zbytków',
    country: 'Poland',
    nip: '5983075519',
    bankAccount: '44422159652897351161',
    bankName: 'Flowdesk Bank',
  },
  {
    accountId,
    name: 'Transcof',
    street: 'Montana',
    buldingNumber: '206',
    locality: '102',
    postalCode: '38-123',
    city: 'Wysoka Strzyżowska',
    country: 'Poland',
    nip: '7195596289',
    bankAccount: '65693911804359744968',
    bankName: 'Hatity Bank',
  },
]

describe('Database - Company Table', () => {
  let accountId = 1

  beforeAll(async () => {
    await initDB.deleteData()
    accountId = await createAccount()
  })

  beforeEach(async () => {
    await initDB.initHandler()
    await initDB.initTestCompanyData(accountId)
  })

  it('Should get all data from db - company table', async () => {
    const companyData = createCompanyData(accountId)
    const companies = await CompanyTable.getCompanies()

    expect(companies.length).toBe(6)
    expect(companies).toEqual(
      expect.arrayContaining([
        expect.objectContaining(companyData[0]),
        expect.objectContaining(companyData[1]),
        expect.objectContaining(companyData[2]),
      ]),
    )
  })

  it('Should get company data by id from db', async () => {
    const id = await CompanyTable.lastId()
    const company = await CompanyTable.getCompanyById(id)
    const companyData = createCompanyData(accountId)
    const keys = Object.keys(companyData[0])

    for (const key of keys) {
      expect(company).toHaveProperty(key)
    }

    expect(id).toBeGreaterThan(0)
  })

  it('Should create company', async () => {
    const payload: CreateCompanyPayload = {
      accountId,
      name: 'Liverpool FC',
      street: 'Anfield Road',
      buldingNumber: '3',
      postalCode: '123456',
      city: 'Liverpool',
      country: 'United Kingdom',
      nip: '1234567890',
      bankAccount: '123456789012345678900000',
      bankName: 'Liverpool Bank',
    }
    const id = await CompanyTable.createCompany(payload)
    const company = await CompanyTable.getCompanyById(id)

    expect(company).toMatchObject(payload)
    expect(id).toBeGreaterThan(0)
  })

  it('Should update company', async () => {
    const id = await CompanyTable.lastId()
    const company = await CompanyTable.getCompanyById(id)
    const payload: UpdateCompanyPayload = {
      id,
      nip: '9876543210',
      bankName: 'HSBC',
    }
    const updatedCompany = await CompanyTable.updateCompany({ ...payload })

    expect(company!.id).toBe(updatedCompany!.id)
    expect(company).not.toMatchObject(updatedCompany!)
    expect(updatedCompany).toMatchObject({ ...company, ...payload })
  })

  it('Should return undefined if vompany to update does not exist', async () => {
    const lastId = await CompanyTable.lastId()
    const id = lastId + 1
    const company = await CompanyTable.getCompanyById(id)
    const payload: UpdateCompanyPayload = {
      id,
      nip: '9876543210',
      bankName: 'HSBC',
    }
    const updatedCompany = await CompanyTable.updateCompany({ ...payload })

    expect(company).toBe(undefined)
    expect(updatedCompany).toBe(undefined)
  })

  it('Should delete company', async () => {
    const payload: CreateCompanyPayload = {
      accountId,
      name: 'Liverpool FC',
      street: 'Anfield Road',
      buldingNumber: '3',
      postalCode: '123456',
      city: 'Liverpool',
      country: 'United Kingdom',
      nip: '1234567890',
      bankAccount: '123456789012345678900000',
      bankName: 'Liverpool Bank',
    }
    const id = await CompanyTable.createCompany(payload)
    const company = await CompanyTable.getCompanyById(id)
    expect(company).toMatchObject(payload)

    const deletedAccount = await CompanyTable.deleteCompany(company!.id)
    expect(company).toMatchObject(deletedAccount!)

    const accountAfterDelete = await AccountTable.getAccountsById(id)
    expect(accountAfterDelete).toBe(undefined)
  })

  it('Should return undefined if company to delete does not exist', async () => {
    const lastId = await CompanyTable.lastId()
    const id = lastId + 1
    const company = await CompanyTable.getCompanyById(id)
    const deletedAccount = await CompanyTable.getCompanyById(id)

    expect(company).toBe(undefined)
    expect(deletedAccount).toBe(undefined)
  })

  afterEach(async () => {
    await initDB.deleteData()
  })
})

const createAccount = async (): Promise<number> => {
  const payload = {
    firstname: 'Bobby',
    lastname: 'Firmino',
    email: 'bobby.firmino@lfc.com',
    password: 'cxzdsaeqw',
  }
  return AccountTable.createAccount(payload)
}

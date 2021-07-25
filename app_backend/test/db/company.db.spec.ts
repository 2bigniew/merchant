import initDB from '../../src/lib/db/init'
import CompanyTable from '../../src/lib/db/company.db'
import AccountTable from '../../src/lib/db/account.db'
import { Company } from '../../contract/Company'

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
    await initDB.initTestCompanyData(accountId)
  })

  beforeEach(async () => {
    await initDB.initHandler()
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

  // it('Should get account data by id from db', async () => {
  //   const id = await AccountTable.lastId()
  //   const account = await AccountTable.getAccountsById(id)
  //
  //   expect(account).toMatchObject(accountData[accountData.length - 1])
  //   expect(id).toBeGreaterThan(0)
  // })
  //
  // it('Should create account', async () => {
  //   const payload = {
  //     firstname: 'Bobby',
  //     lastname: 'Firmino',
  //     email: 'bobby.firmino@lfc.com',
  //     password: 'cxzdsaeqw',
  //   }
  //   const id = await AccountTable.createAccount(payload)
  //   const account = await AccountTable.getAccountsById(id)
  //
  //   expect(account).toMatchObject(payload)
  //   expect(id).toBeGreaterThan(0)
  // })
  //
  // it('Should update account', async () => {
  //   const id = await AccountTable.lastId()
  //   const account = await AccountTable.getAccountsById(id)
  //   const payload = {
  //     firstname: 'Virgil',
  //     lastname: 'Van Dijk',
  //   }
  //   const updatedAccount = await AccountTable.updateAccount({ ...payload, id })
  //
  //   expect(account!.id).toBe(updatedAccount!.id)
  //   expect(account).not.toMatchObject(updatedAccount!)
  //   expect(updatedAccount).toMatchObject(payload)
  // })
  //
  // it('Should return undefined if account to update does not exist', async () => {
  //   const lastId = await AccountTable.lastId()
  //   const id = lastId + 1
  //   const account = await AccountTable.getAccountsById(id)
  //   const payload = {
  //     firstname: 'Virgil',
  //     lastname: 'Van Dijk',
  //   }
  //   const updatedAccount = await AccountTable.updateAccount({ ...payload, id })
  //
  //   expect(account).toBe(undefined)
  //   expect(updatedAccount).toBe(undefined)
  // })
  //
  // it('Should delete account', async () => {
  //   const payload = {
  //     firstname: 'Bobby',
  //     lastname: 'Firmino',
  //     email: 'bobby.firmino@lfc.com',
  //     password: 'cxzdsaeqw',
  //   }
  //   const id = await AccountTable.createAccount(payload)
  //   const account = await AccountTable.getAccountsById(id)
  //   expect(account).toMatchObject(payload)
  //
  //   const deletedAccount = await AccountTable.deleteAccount(account!.id)
  //   expect(account).toMatchObject(deletedAccount!)
  //
  //   const accountAfterDelete = await AccountTable.getAccountsById(id)
  //   expect(accountAfterDelete).toBe(undefined)
  // })
  //
  // it('Should return undefined if account to delete does not exist', async () => {
  //   const lastId = await AccountTable.lastId()
  //   const id = lastId + 1
  //   const account = await AccountTable.getAccountsById(id)
  //   const deletedAccount = await AccountTable.deleteAccount(id)
  //   const accountAfterDelete = await AccountTable.getAccountsById(id)
  //
  //   expect(account).toBe(undefined)
  //   expect(deletedAccount).toBe(undefined)
  //   expect(accountAfterDelete).toBe(undefined)
  // })

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

import initDB from '../../src/lib/db/init'
import CustomerTable from '../../src/lib/db/customer.db'
import AccountTable from '../../src/lib/db/account.db'
import { CreateCompanyPayload, UpdateCompanyPayload } from '../../contract/Company'
import { Customer } from '../../contract/Customer'

const createCustomersData = (accountId: number): Omit<Customer, 'id' | 'createdAt'>[] => [
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

describe('Database - Customer Table', () => {
  let accountId = 1

  beforeAll(async () => {
    await initDB.deleteData()
    accountId = await createAccount()
  })

  beforeEach(async () => {
    await initDB.initHandler()
    await initDB.initTestCustomerData(accountId)
  })

  it('Should get all data from db - customer table', async () => {
    const customerData = createCustomersData(accountId)
    const customers = await CustomerTable.getCustomers()

    expect(customers.length).toBe(6)
    expect(customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customerData[0]),
        expect.objectContaining(customerData[1]),
        expect.objectContaining(customerData[2]),
      ]),
    )
  })

  it('Should get customer data by id from db', async () => {
    const id = await CustomerTable.lastId()
    const customer = await CustomerTable.getCustomerById(id)
    const customerData = createCustomersData(accountId)
    const keys = Object.keys(customerData[0])

    for (const key of keys) {
      expect(customer).toHaveProperty(key)
    }

    expect(id).toBeGreaterThan(0)
  })

  it('Should create customer', async () => {
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
    const id = await CustomerTable.createCustomer(payload)
    const customer = await CustomerTable.getCustomerById(id)

    expect(customer).toMatchObject(payload)
    expect(id).toBeGreaterThan(0)
  })

  it('Should update customer', async () => {
    const id = await CustomerTable.lastId()
    const customer = await CustomerTable.getCustomerById(id)
    const payload: UpdateCompanyPayload = {
      id,
      nip: '9876543210',
      bankName: 'HSBC',
    }
    const updatedCustomer = await CustomerTable.updateCustomer({ ...payload })

    expect(customer!.id).toBe(updatedCustomer!.id)
    expect(customer).not.toMatchObject(updatedCustomer!)
    expect(updatedCustomer).toMatchObject({ ...customer, ...payload })
  })

  it('Should return undefined if customer to update does not exist', async () => {
    const lastId = await CustomerTable.lastId()
    const id = lastId + 1
    const customer = await CustomerTable.getCustomerById(id)
    const payload: UpdateCompanyPayload = {
      id,
      nip: '9876543210',
      bankName: 'HSBC',
    }
    const updatedCustomer = await CustomerTable.updateCustomer({ ...payload })

    expect(customer).toBe(undefined)
    expect(updatedCustomer).toBe(undefined)
  })

  it('Should delete customer', async () => {
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
    const id = await CustomerTable.createCustomer(payload)
    const customer = await CustomerTable.getCustomerById(id)
    expect(customer).toMatchObject(payload)

    const deletedAccount = await CustomerTable.deleteCustomer(customer!.id)
    expect(customer).toMatchObject(deletedAccount!)

    const accountAfterDelete = await CustomerTable.getCustomerById(id)
    expect(accountAfterDelete).toBe(undefined)
  })

  it('Should return undefined if customer to delete does not exist', async () => {
    const lastId = await CustomerTable.lastId()
    const id = lastId + 1
    const customer = await CustomerTable.getCustomerById(id)
    const deletedCustomer = await CustomerTable.deleteCustomer(id)

    expect(customer).toBe(undefined)
    expect(deletedCustomer).toBe(undefined)
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

import {
  mapDBObjectToJSFormat,
  mapJSObjectToDBFormat,
  prepareCreateProps,
  prepareUpdateProps,
  SQLitiffy,
} from '../../src/lib/db/helpers'

const payload = {
  firstname: 'Krishna',
  lastname: 'Carnalan',
  email: 'kcarnalan0@yellowpages.com',
  password: 'z9Bcu06',
}

const jsObject = {
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
}

const dbObject = {
  name: 'Transcof',
  street: 'Montana',
  bulding_number: '206',
  locality: '102',
  postal_code: '38-123',
  city: 'Wysoka Strzyżowska',
  country: 'Poland',
  nip: '7195596289',
  bank_account: '65693911804359744968',
  bank_name: 'Hatity Bank',
}

describe('Database - Helpers', () => {
  it('prepareCreateProps', async () => {
    const { keys, values } = prepareCreateProps({ ...payload })
    expect(keys).toBe('firstname, lastname, email, password')
    expect(values).toBe('Krishna, Carnalan, kcarnalan0@yellowpages.com, z9Bcu06')
  })

  it('prepareUpdateProps', async () => {
    const data = prepareUpdateProps({ ...payload, email: undefined })
    expect(data).toBe('firstname = $firstname, lastname = $lastname, password = $password')
  })

  it('SQLitiffy', async () => {
    const data = SQLitiffy({ ...payload })
    expect(data).toMatchObject({
      ['$firstname']: 'Krishna',
      ['$lastname']: 'Carnalan',
      ['$email']: 'kcarnalan0@yellowpages.com',
      ['$password']: 'z9Bcu06',
    })
  })

  it('mapJSObjectToDBFormat', async () => {
    const data = mapJSObjectToDBFormat(jsObject)
    expect(data).toMatchObject(dbObject)
  })

  it('mapDBObjectToJSFormat', async () => {
    const data = mapDBObjectToJSFormat(dbObject)
    expect(data).toMatchObject(jsObject)
  })
})

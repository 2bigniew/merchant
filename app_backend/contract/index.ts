export type DBObject = Record<string, any>

export type Currency = 'PLN' | 'EUR' | 'USD' | 'GBP'

export type TableName =
    | 'account'
    | 'company'
    | 'settings'
    | 'customer'
    | 'invoice'
    | 'invoice_position'

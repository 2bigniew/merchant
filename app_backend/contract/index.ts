export interface Account {
    id: number
    firstname: string
    lastname: string
    email: string
    createdAt: Date
}

export interface Company {
    id: number
    accountId: number
    name: string
    street: string
    buldingNumber?: string
    locality?: string
    postalCode: string
    city: string
    country: string
    nip: string
    bankAccount: string
    bankName?: string
    createdAt: Date
}

export interface Settings {
    id: number
    accountId: number
    bussinesActivityCode: string
    invoiceNumberSchema: string
    paymentPeriod: string
    currency: string
}

export interface Customer {
    id: number
    accountId: number
    name: string
    street: string
    buldingNumber?: string
    locality?: string
    postalCode: string
    city: string
    country: string
    nip: string
    bankAccount: string
    bankName?: string
    createdAt: Date
}

export interface Invoice {
    id: number
    accountId: number
    customerId: number
    invoiceNumber: string
    priceNet: number
    price: number
    vat: number
    currency: Currency
    paymentDay: Date
    paymentPeriod?: string
    servicePeriod?: string
    author?: string
    createdAt: Date
}

export interface InvoicePosition {
    id: number
    invoiceId: number
    positionName: string
    businessActivityCode?: string
    measurement: string
    amount: number
    priceNet: number
    price: number
    vat: number
    vatRate: number
    totalValueNet: number
    totalValue: number
    currency: Currency
}

export type Currency = 'PLN' | 'EUR' | 'USD' | 'GBP'

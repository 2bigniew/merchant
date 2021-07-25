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

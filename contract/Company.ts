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


export type CreateCompanyPayload = Omit<Company, 'id' | 'createdAt'>

export type UpdateCompanyPayload = Partial<CreateCompanyPayload> & { id: number }

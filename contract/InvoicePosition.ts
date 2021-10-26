import {Currency} from "./general";

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
    createdAt: Date
}

export type CreateInvoicePositionPayload = Omit<InvoicePosition, 'id' | 'createdAt'>

export type UpdateInvoicePositionPayload = Partial<CreateInvoicePositionPayload> & { id: number }
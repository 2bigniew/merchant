import {Currency} from "./index";

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
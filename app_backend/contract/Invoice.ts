import {Currency} from "./index";

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
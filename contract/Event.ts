import {Account} from "./Account";
import {Company} from "./Company";
import {Customer} from "./Customer";
import {Invoice} from "./Invoice";
import {InvoicePosition} from "./InvoicePosition";
import {CommandsNames} from "./Command";

export const EVENT = 'event' as const

export type Changed<T> = { before?: T, after: T} | { before: T, after?: T}

export const EVENTS_NAMES = [
    'event.account.created',
    'event.account.updated',
    'event.account.deleted',
    'event.company.created',
    'event.company.updated',
    'event.company.deleted',
    'event.customer.created',
    'event.customer.updated',
    'event.customer.deleted',
    'event.invoice.created',
    'event.invoice.updated',
    'event.invoice.deleted',
    'event.invoicePosition.created',
    'event.invoicePosition.updated',
    'event.invoicePosition.deleted',
] as const

export type EventsNames = typeof EVENTS_NAMES[number]

type EventBase<N extends EventsNames, R> = { name: N; response: Changed<R> }

type EventAccountCreate = EventBase<'event.account.created', Account>

type EventAccountUpdate = EventBase<'event.account.updated', Account>

type EventAccountDelete = EventBase<'event.account.deleted', Account>

type EventCompanyCreate = EventBase<'event.company.created', Company>

type EventCompanyUpdate = EventBase<'event.company.updated', Company>

type EventCompanyDelete = EventBase<'event.company.deleted', Company>

type EventCustomerCreate = EventBase<'event.customer.created', Customer>

type EventCustomerUpdate = EventBase<'event.customer.updated', Customer>

type EventCustomerDelete = EventBase<'event.customer.deleted', Customer>

type EventInvoiceCreate = EventBase<'event.invoice.created', Invoice>

type EventInvoiceUpdate = EventBase<'event.invoice.updated', Invoice>

type EventInvoiceDelete = EventBase<'event.invoice.deleted', Invoice>

type EventInvoicePositionCreate = EventBase<'event.invoicePosition.created', InvoicePosition>

type EventInvoicePositionUpdate = EventBase<'event.invoicePosition.updated', InvoicePosition>

type EventInvoicePositionDelete = EventBase<'event.invoicePosition.deleted', InvoicePosition>

export type Event = { type: 'event'} & (
    | EventAccountCreate
    | EventAccountUpdate
    | EventAccountDelete
    | EventCompanyCreate
    | EventCompanyUpdate
    | EventCompanyDelete
    | EventCustomerCreate
    | EventCustomerUpdate
    | EventCustomerDelete
    | EventInvoiceCreate
    | EventInvoiceUpdate
    | EventInvoiceDelete
    | EventInvoicePositionCreate
    | EventInvoicePositionUpdate
    | EventInvoicePositionDelete
    )

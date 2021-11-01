import {CreateAccountPayload, UpdateAccountPayload} from "./Account";
import {CreateCompanyPayload, UpdateCompanyPayload} from "./Company";
import {CreateCustomerPayload, UpdateCustomerPayload} from "./Customer";
import {CreateInvoicePayload, UpdateInvoicePayload} from "./Invoice";
import {CreateInvoicePositionPayload, UpdateInvoicePositionPayload} from "./InvoicePosition";

export const COMMANDS_NAMES = [
    'command.account.create',
    'command.account.update',
     'command.account.delete',
     'command.company.create',
     'command.company.update',
     'command.company.delete',
     'command.customer.create',
     'command.customer.update',
     'command.customer.delete',
     'command.invoice.create',
     'command.invoice.update',
     'command.invoice.delete',
     'command.invoicePosition.create',
     'command.invoicePosition.update',
     'command.invoicePosition.delete',
] as const

export type CommandsNames = typeof COMMANDS_NAMES[number]

type CommandBase<N extends CommandsNames, P> = { name: N; payload: P }

type CommandAccountCreate = CommandBase<'command.account.create', CreateAccountPayload>

type CommandAccountUpdate = CommandBase<'command.account.update', UpdateAccountPayload>

type CommandAccountDelete = CommandBase<'command.account.delete', { id: number }>

type CommandCompanyCreate = CommandBase<'command.company.create', CreateCompanyPayload>

type CommandCompanyUpdate = CommandBase<'command.company.update', UpdateCompanyPayload>

type CommandCompanyDelete = CommandBase<'command.company.delete', { id: number }>

type CommandCustomerCreate = CommandBase<'command.customer.create', CreateCustomerPayload>

type CommandCustomerUpdate = CommandBase<'command.customer.update', UpdateCustomerPayload>

type CommandCustomerDelete = CommandBase<'command.customer.delete', { id: number }>

type CommandInvoiceCreate = CommandBase<'command.invoice.create', CreateInvoicePayload>

type CommandInvoiceUpdate = CommandBase<'command.invoice.update', UpdateInvoicePayload>

type CommandInvoiceDelete = CommandBase<'command.invoice.delete', { id: number }>

type CommandInvoicePositionCreate = CommandBase<'command.invoicePosition.create', CreateInvoicePositionPayload>

type CommandInvoicePositionUpdate = CommandBase<'command.invoicePosition.update', UpdateInvoicePositionPayload>

type CommandInvoicePositionDelete = CommandBase<'command.invoicePosition.delete', { id: number }>

export type Command = { type: 'command'} & (
    | CommandAccountCreate
    | CommandAccountUpdate
    | CommandAccountDelete
    | CommandCompanyCreate
    | CommandCompanyUpdate
    | CommandCompanyDelete
    | CommandCustomerCreate
    | CommandCustomerUpdate
    | CommandCustomerDelete
    | CommandInvoiceCreate
    | CommandInvoiceUpdate
    | CommandInvoiceDelete
    | CommandInvoicePositionCreate
    | CommandInvoicePositionUpdate
    | CommandInvoicePositionDelete
    )
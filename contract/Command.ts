import {CreateAccountPayload, UpdateAccountPayload} from "./Account";
import {CreateCompanyPayload, UpdateCompanyPayload} from "./Company";
import {CreateCustomerPayload, UpdateCustomerPayload} from "./Customer";
import {CreateInvoicePayload, UpdateInvoicePayload} from "./Invoice";
import {CreateInvoicePositionPayload, UpdateInvoicePositionPayload} from "./InvoicePosition";
import {EventsNames} from "./Event";

export const COMMAND = 'command' as const
export const COMMAND_FAILURE = 'command.failure' as const

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

export type CommandsFailuresNames = `${CommandsNames}.failed`

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

export type CommandFailure = {
 type: typeof COMMAND_FAILURE,
 name: CommandsFailuresNames,
 payload: any
}

export const COMMANDS_TO_EVENTS: Record<
    CommandsNames,
    { success: EventsNames; failure: CommandsFailuresNames }
    > = {
 'command.account.create': {
  success: 'event.account.created',
  failure: 'command.account.create.failed',
 },
 'command.account.update': {
  success: 'event.account.updated',
  failure: 'command.account.update.failed',
 },
 'command.account.delete': {
  success: 'event.account.deleted',
  failure: 'command.account.delete.failed',
 },
 'command.company.create': {
  success: 'event.company.created',
  failure: 'command.company.create.failed',
 },
 'command.company.update': {
  success: 'event.company.updated',
  failure: 'command.company.update.failed',
 },
 'command.company.delete': {
  success: 'event.company.deleted',
  failure: 'command.company.delete.failed',
 },
 'command.customer.create': {
  success: 'event.customer.created',
  failure: 'command.customer.create.failed',
 },
 'command.customer.update': {
  success: 'event.customer.updated',
  failure: 'command.customer.update.failed',
 },
 'command.customer.delete': {
  success: 'event.customer.deleted',
  failure: 'command.customer.delete.failed',
 },
 'command.invoice.create': {
  success: 'event.invoice.created',
  failure: 'command.invoice.create.failed',
 },
 'command.invoice.update': {
  success: 'event.invoice.updated',
  failure: 'command.invoice.update.failed',
 },
 'command.invoice.delete': {
  success: 'event.invoice.deleted',
  failure: 'command.invoice.delete.failed',
 },
 'command.invoicePosition.create': {
  success: 'event.invoicePosition.created',
  failure: 'command.invoicePosition.create.failed',
 },
 'command.invoicePosition.update': {
  success: 'event.invoicePosition.updated',
  failure: 'command.invoicePosition.update.failed',
 },
 'command.invoicePosition.delete': {
  success: 'event.invoicePosition.deleted',
  failure: 'command.invoicePosition.delete.failed',
 },
}
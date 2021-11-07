import Joi from 'joi'
import { CURRENCY_VALUES } from '../../../../../contract/general'
import { COMMANDS_NAMES, CommandsNames } from '../../../../../contract/Command'
import {accountSchemasToCommandMap, accountSchemasToEventMap} from './accountSchema'
import {companySchemasToCommandMap, companySchemasToEventMap} from './companySchema'
import {customerSchemasToCommandMap, customerSchemasToEventMap} from './customerSchema'
import {invoiceSchemasToCommandMap, invoiceSchemasToEventMap} from './invoiceSchema'
import {invoicePositionSchemasToCommandMap, invoicePositionSchemasToEventMap} from './invoicePositionSchema'
import {EVENTS_NAMES, EventsNames} from '../../../../../contract/Event'

export const idSchema = Joi.number().positive().integer()

export const currencySchema = Joi.string().valid(...CURRENCY_VALUES)

export const dbObjectWrapperSchema = Joi.object({
  id: idSchema.required(),
  createdAt: Joi.string().required(),
})

export type SchemasToCommand = Record<CommandsNames, Joi.Schema>

export type SchemasToEvent = Record<EventsNames, { before?: Joi.Schema; after?: Joi.Schema }>

export const commandTypeSchema = Joi.string()
  .valid(...COMMANDS_NAMES)
  .required()

export const schemasToCommandMap: SchemasToCommand = {
  ...accountSchemasToCommandMap,
  ...companySchemasToCommandMap,
  ...customerSchemasToCommandMap,
  ...invoiceSchemasToCommandMap,
  ...invoicePositionSchemasToCommandMap,
}

export const schemasToEventMap: SchemasToEvent = {
  ...accountSchemasToEventMap,
  ...companySchemasToEventMap,
  ...customerSchemasToEventMap,
  ...invoiceSchemasToEventMap,
  ...invoicePositionSchemasToEventMap,
}

export const eventTypeSchema = Joi.string()
  .valid(...EVENTS_NAMES)
  .required()

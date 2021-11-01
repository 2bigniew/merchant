import Joi from 'joi'
import { CURRENCY_VALUES } from '../../../../../contract/general'
import { COMMANDS_NAMES, CommandsNames } from '../../../../../contract/Command'
import { accountSchemasToCommandMap } from './accountSchema'
import { companySchemasToCommandMap } from './companySchema'
import { customerSchemasToCommandMap } from './customerSchema'
import { invoiceSchemasToCommandMap } from './invoiceSchema'

export const idSchema = Joi.number().positive().integer()

export const currencySchema = Joi.string().valid(...CURRENCY_VALUES)

export type SchemasToCommand = Record<CommandsNames, Joi.Schema>

export const commandTypeSchema = Joi.string().valid(...COMMANDS_NAMES)

export const schemasToCommandMap: SchemasToCommand = {
  ...accountSchemasToCommandMap,
  ...companySchemasToCommandMap,
  ...customerSchemasToCommandMap,
  ...invoiceSchemasToCommandMap,
}

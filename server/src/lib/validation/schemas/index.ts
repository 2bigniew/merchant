import * as Joi from 'joi'
import { EventsNames } from '../../../../../contract/Event'
import { CommandsNames } from '../../../../../contract/Command'
import { CURRENCY_VALUES } from '../../../../../contract/general'
import { COMMANDS_NAMES } from '../../../../../contract/Command'
import { EVENTS_NAMES } from '../../../../../contract/Event'

export type SchemasToCommand = Record<CommandsNames, Joi.Schema>

export type SchemasToEvent = Record<EventsNames, { before?: Joi.Schema; after?: Joi.Schema }>

export const idSchema = Joi.number().positive().integer()

export const currencySchema = Joi.string().valid(...CURRENCY_VALUES)

export const dbObjectWrapperSchema = Joi.object({
  id: idSchema.required(),
  createdAt: Joi.string().required(),
})

export const commandTypeSchema = Joi.string()
  .valid(...COMMANDS_NAMES)
  .required()

export const eventTypeSchema = Joi.string()
  .valid(...EVENTS_NAMES)
  .required()

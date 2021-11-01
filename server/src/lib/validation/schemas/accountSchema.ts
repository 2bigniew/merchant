import Joi from 'joi'
import { idSchema, SchemasToCommand } from './index'

export const createAccountSchema = Joi.object({
  firstname: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(150).required(),
  password: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
}).required()

export const updateAccountSchema = Joi.object({
  id: idSchema.required(),
  firstname: Joi.string().min(2).max(50),
  lastname: Joi.string().min(2).max(150),
  password: Joi.string().min(2).max(50),
  email: Joi.string().email().required(),
}).required()

export const deleteAccountSchema = Joi.object({ id: idSchema.required() }).required()

export const accountSchemasToCommandMap: Partial<SchemasToCommand> = {
  'command.account.create': createAccountSchema,
  'command.account.update': updateAccountSchema,
  'command.account.delete': deleteAccountSchema,
}

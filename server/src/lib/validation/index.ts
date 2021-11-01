import Joi from 'joi'

export const validateSchema = <T>(
  payload: T,
  schema: Joi.Schema | Record<keyof Required<T>, Joi.Schema>,
) => {
  const validation = Joi.compile(schema).validate(payload)
  if (validation.error) {
    console.error(validation.error) // TODO add logger and failure handler
  }
  return validation.value
}

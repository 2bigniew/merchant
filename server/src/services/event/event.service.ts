import { Injectable } from '@nestjs/common'
import EventEmitter from 'events'
import { Command, CommandsFailuresNames, CommandsNames } from '../../../../contract/Command'
import {validateCommand, validateEvent, validateSchema} from '../../lib/validation'
import {commandTypeSchema, eventTypeSchema} from '../../lib/validation/schemas'
import { Event, EventsNames } from '../../../../contract/Event'

@Injectable()
export class EventService {
  constructor(private broker: EventEmitter) {}

  public prepareCommand(args: any): Command {
    const {type, name, ...rest} = args
    const commandName = validateSchema(name, commandTypeSchema)
    return validateCommand(commandName, rest)
  }

  public prepareEvent(args: any): Event {
    const {type, name, ...rest} = args
    const eventName = validateSchema(name, eventTypeSchema)
    return validateEvent(eventName, rest)
  }

  public async emitCommand(command: Command): Promise<void> {
    return new Promise((resolve, reject) => {
      this.broker.emit(command.name, command.payload)
      const { success, failure } = COMMANDS_TO_EVENTS[command.name]

      const timeout = setTimeout(() => {
        this.broker.emit(failure, command.payload)
        console.log(`Command failed - ${failure}`)
        reject()
      }, 5000)

      this.broker.on(success, () => {
        console.log(`Command succeed, respond by an event - ${success}`)
        clearTimeout(timeout)
        resolve()
      })
    })
  }

  public eventEmiter<T>(commandName: CommandsNames, callback: (payload: T) => void): void {
    const { success } = COMMANDS_TO_EVENTS[commandName]
    this.broker.on(commandName, (payload) => {
      this.broker.emit(success)
      callback(payload)
    })
  }

  public handleCommandFailures() {
    const failuresNames = Object.values(COMMANDS_TO_EVENTS).map((cte) => cte.failure)
    for (const failure of failuresNames) {
      this.broker.on(failure, (payload) => {
        console.log(`failureDetails: ${failure}`)
        console.log(payload)
      })
    }
  }
}

const COMMANDS_TO_EVENTS: Record<
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

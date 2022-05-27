import { Changed, EVENT, EventsNames, Event } from 'contract/Event'
import {validateCommand, validateEvent, validateSchema} from "lib/validation";
import {commandTypeSchema, eventTypeSchema} from "lib/validation/schemas";
import { Injectable } from '@nestjs/common'
import EventEmitter from 'events'
import {
  Command,
  COMMAND_FAILURE,
  CommandFailure,
  COMMANDS_TO_EVENTS,
  CommandsFailuresNames,
  CommandsNames,
} from 'contract/Command'

@Injectable()
export class EventService {
  constructor(private broker: EventEmitter) {}

  public prepareCommand(args: any): Command {
    const { name, payload } = args
    const commandName = validateSchema(name, commandTypeSchema)
    return validateCommand(commandName, payload)
  }

  public prepareEvent(args: any): Event {
    const { name, payload } = args
    const eventName = validateSchema(name, eventTypeSchema)
    return validateEvent(eventName, payload)
  }

  public async emitCommand(command: Command): Promise<void> {
    return new Promise((resolve, reject) => {
      const { success, failure } = COMMANDS_TO_EVENTS[command.name]

      const timeout = setTimeout(() => {
        this.broker.emit(failure, command.payload)
        console.log(`Command failed - ${failure}`)
        reject()
      }, 5000)

      console.log(success)

      this.broker.on(success, () => {
        console.log(`Command succeed, respond by an event - ${success}`)
        clearTimeout(timeout)
        resolve()
      })

      this.broker.emit(command.name, command.payload)
    })
  }

  public eventEmiter<T>(
    commandName: CommandsNames,
    callback: (payload: T) => Promise<Changed<T>>,
  ): void {
    const { success } = COMMANDS_TO_EVENTS[commandName]
    this.broker.on(commandName, async (payload: T) => {
      const response = await callback(payload)
      console.log(success, response)
      this.broker.emit(success, response)
    })
  }

  public eventHandler(
    eventName: EventsNames,
    callback: (action: string, payload: Event) => boolean,
  ): void {
    this.broker.on(eventName, (payload: any) => {
      console.log('ON EVENT')
      const event = this.prepareEvent({
        type: EVENT,
        name: eventName,
        payload,
      })
      try {
        callback(EVENT, event)
      } catch (e) {
        console.error(e)
      }
    })
  }

  public commandsFailuresHandler(
    commandFailureName: CommandsFailuresNames,
    callback: (action: string, payload: CommandFailure) => boolean,
  ): void {
    this.broker.on(commandFailureName, (payload: any) => {
      console.log(`failureDetails: ${commandFailureName}`)
      console.log(payload)
      try {
        callback(COMMAND_FAILURE, {
          type: COMMAND_FAILURE,
          name: commandFailureName,
          payload,
        })
      } catch (e) {
        console.error(e)
      }
    })
  }
}

export default new EventService(new EventEmitter())

import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import EventEmitter from 'events'
import {
  Command,
  COMMAND_FAILURE,
  CommandFailure,
  COMMANDS_TO_EVENTS,
  CommandsFailuresNames,
  CommandsNames,
} from '../../../../contract/Command'
import { validateCommand, validateEvent, validateSchema } from '../../lib/validation'
import { Changed, EVENT, Event, EventsNames } from '../../../../contract/Event'
import { commandTypeSchema, eventTypeSchema } from '../../lib/validation/schemas'
import { Socket } from 'socket.io'
import {
  getListenersCountForEvents,
  LISTENERS_COUNT_FOR_EVENTS,
  ListenersCountForEvents,
} from './helpers'

@Injectable()
export class EventService {
  listenersCountsForEvents: Partial<ListenersCountForEvents>

  constructor(
    @Inject(forwardRef(() => EventEmitter)) private readonly broker: EventEmitter,
    @Inject(forwardRef(() => Logger)) private readonly logger = new Logger('EventService'),
  ) {
    this.listenersCountsForEvents = {
      ...getListenersCountForEvents(),
      ...LISTENERS_COUNT_FOR_EVENTS,
    }
  }

  public onSocketCommandHandler = (args: any) => {
    const command = this.prepareCommand(args)
    this.emitCommand(command)
  }

  public onCommandHandler<T>(
    commandName: CommandsNames,
    callback: (payload: T) => Promise<Changed<T>>,
  ): void {
    const { success } = COMMANDS_TO_EVENTS[commandName]

    this.broker.addListener(commandName, async (payload: T) => {
      const response = await callback(payload)
      this.broker.emit(success, response)
    })
  }

  public onEventSuccessHandler(socket: Socket, eventName: EventsNames): void {
    const listenersLimit = this.listenersCountsForEvents[eventName] || 1
    if (this.broker.listenerCount(eventName) >= listenersLimit) {
      // TODO TEMP - find better solution
      this.logger.log(`Listeners for ${eventName} already declared`)
      return
    }
    this.broker.addListener(eventName, (payload: any) => {
      const event = this.prepareEvent({
        type: EVENT,
        name: eventName,
        payload,
      })
      this.emitSocketEvent(socket, event)
    })
  }

  public onEventFailHandler(socket: Socket, commandFailureName: CommandsFailuresNames): void {
    this.broker.addListener(commandFailureName, (payload: any) => {
      const commandFailure = {
        type: COMMAND_FAILURE,
        name: commandFailureName,
        payload,
      }
      this.emitSocketEvent(socket, commandFailure)
    })
  }

  private emitSocketEvent(socket: Socket, socketEvent: Event | CommandFailure) {
    try {
      socket.emit(socketEvent.type, socketEvent)
      this.logger.log(`Socket event emitted, type: ${socketEvent.type}, name: ${socketEvent.name}`)
    } catch (e) {
      this.logger.error(e)
    }
  }

  private prepareCommand(args: any): Command {
    const { name, payload } = args
    const commandName = validateSchema(name, commandTypeSchema)
    return validateCommand(commandName, payload)
  }

  private prepareEvent(args: any): Event {
    const { name, payload } = args
    const eventName = validateSchema(name, eventTypeSchema)
    return validateEvent(eventName, payload)
  }

  private emitCommand(command: Command): void {
    this.broker.emit(command.name, command.payload)
    this.logger.log(`Command: ${command.name} succeed`)
  }
}

export default new EventService(new EventEmitter())

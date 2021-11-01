import { Injectable } from '@nestjs/common'
import EventEmitter from 'events'
import { Command } from '../../../../contract/Command'

@Injectable()
export class EventService {
  constructor(private broker: EventEmitter) {}

  public prepareCommand(args: any): Command {
    return {
      type: 'command',
      name: 'command.account.create',
      payload: {},
    }
  }
}

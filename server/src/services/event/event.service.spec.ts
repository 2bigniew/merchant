import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import EventEmitter from 'events'

import { EventService } from './event.service'
import { Command } from '../../../../contract/Command'

describe('EventService', () => {
  let service: EventService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, EventEmitter, Logger],
    }).compile()

    service = module.get<EventService>(EventService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // it('should emit event', () => {
  //   const command: any = {
  //     type: 'command',
  //     name: 'command.account.create',
  //     payload: {
  //       firstname: 'John',
  //       lastname: 'Doe',
  //       email: 'john.doe@mail.com',
  //       password: 'aaaaaa',
  //     },
  //   }
  // })
})

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import initDB from './lib/db/init'
import socketIo, { Socket } from 'socket.io'
import { fixtures } from './lib/fixtures'
import { COMMAND, COMMANDS_NAMES, CommandsFailuresNames } from '../../contract/Command'
import { EVENT, EVENTS_NAMES } from '../../contract/Event'
import EventService from './services/event/event.service'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  try {
    console.log('process.env.NODE_ENV')
    console.log(process.env.NODE_ENV)
    await initDB.initHandler()
    // await fixtures()
  } catch (e) {
    console.log(e)
  }
  app.enableCors() // TODO on development toggle
  const server = app.getHttpServer()
  const socketServer = new socketIo.Server(server, {
    cors: {
      origin: ['http://localhost:4200'],
      credentials: true,
    },
  })
  await app.listen(PORT)

  socketServer.on('connection', async (socket) => {
    console.log('Socket: client connected')

    socket.on(COMMAND, async (args) => {
      // console.log(args)
      const command = EventService.prepareCommand(args)
      await EventService.emitCommand(command)
    })

    socketEventsEmmiter(socket)
    socketCommandsFailuresEmmiter(socket)
  })
}
bootstrap()

const socketEventsEmmiter = (socket: Socket) => {
  for (const eventName of EVENTS_NAMES) {
    EventService.eventHandler(eventName, socket.emit)
  }
}

const socketCommandsFailuresEmmiter = (socket: Socket) => {
  const commandFailureNames = COMMANDS_NAMES.map(
    (name) => `${name}.failed` as CommandsFailuresNames,
  )
  for (const name of commandFailureNames) {
    EventService.commandsFailuresHandler(name, socket.emit)
  }
}

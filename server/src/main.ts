import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import initDB from './lib/db/init'
import socketIo from 'socket.io'
import { fixtures } from './lib/fixtures'
import {COMMAND} from "../../contract/Command";
import {EVENT} from "../../contract/Event";

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

    socket.on(COMMAND, (args) => {
      console.log(args)
    })

    socket.on(EVENT, (args) => {
      console.log(args)
    })
  })
}
bootstrap()

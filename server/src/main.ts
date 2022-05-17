import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import socketIo from 'socket.io'
import initDB from './lib/db/init'
import { initializeListeners } from './socket'

const PORT = process.env.PORT || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  })

  try {
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

  socketServer.on('connection', (socket) => {
    initializeListeners(socket)
  })
}
bootstrap()

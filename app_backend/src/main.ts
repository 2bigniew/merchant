import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import initDB from './lib/db/init'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  try {
    await initDB.initHandler()
  } catch (e) {
    console.log(e)
  }
  await app.listen(3000)
}
bootstrap()

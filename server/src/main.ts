import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import initDB from './lib/db/init'
import {fixtures} from "./lib/fixtures";

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
  await app.listen(PORT)
}
bootstrap()

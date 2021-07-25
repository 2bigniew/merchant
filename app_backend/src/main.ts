import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import initDB from './lib/db/init'
import AccountTable from './lib/db/account.db'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  try {
    await initDB.initHandler()
    const accounts = await AccountTable.getAccounts()
    console.log('accounts', accounts)
    const id = await AccountTable.lastId()
    console.log('id')
    console.log(id)
    console.log(typeof id)
  } catch (e) {
    console.log(e)
  }
  await app.listen(3000)
}
bootstrap()

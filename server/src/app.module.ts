import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CustomerModule } from './customer/customer.module'
import { AccountModule } from './account/account.module'

@Module({
  imports: [CustomerModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}

import { Injectable } from '@nestjs/common'
import { AccountListener } from './account/account.listener'

type Listeners = {
  accountListener: AccountListener
}

@Injectable()
export class AppService {
  private listeners: Listeners

  constructor() {
    this.listeners = runListeners()
  }

  getHello(): string {
    return 'Hello World!'
  }
}

const runListeners = (): Listeners => ({
  accountListener: new AccountListener(),
})

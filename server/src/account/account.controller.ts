import { Controller, Get, Param } from '@nestjs/common'
import { Account } from '../../../contract/Account'
import AccountTable from '../lib/db/account.db'

@Controller('/account')
export class AccountController {

  @Get('/list')
  getAccountsList(): Promise<Account[]> {
    return AccountTable.getAccounts()
  }

  @Get('/id/:accountId')
  getAccountObs(@Param('accountId') accountId: number): Promise<Account | undefined> {
    return AccountTable.getAccountsById(accountId)
  }

}

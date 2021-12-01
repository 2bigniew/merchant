import { Account, CreateAccountPayload, UpdateAccountPayload } from '../../../contract/Account'
import AccountTable from '../lib/db/account.db'
import { Changed } from '../../../contract/Event'
import EventService from '../services/event/event.service'

export class AccountListener {
  constructor() {
    EventService.eventEmiter<CreateAccountPayload>(
      'command.account.create',
      this.accountCreateHandler,
    )
    EventService.eventEmiter<UpdateAccountPayload>(
      'command.account.update',
      this.accountUpdateHandler,
    )
    EventService.eventEmiter<{ id: number }>('command.account.delete', this.accountDeleteHandler)
  }

  private async accountCreateHandler(payload: CreateAccountPayload): Promise<Changed<Account>> {
    const accountId = await AccountTable.createAccount(payload)
    const after = await AccountTable.getAccountsById(accountId)
    if (!after) {
      throw new Error('Created account not found')
    }

    return { after }
  }

  private async accountUpdateHandler(payload: UpdateAccountPayload): Promise<Changed<Account>> {
    const before = await AccountTable.getAccountsById(payload.id)
    if (!before) {
      throw new Error('Account to update not found')
    }
    const after = await AccountTable.updateAccount(payload)
    return { before, after }
  }

  private async accountDeleteHandler(payload: { id: number }): Promise<Changed<Account>> {
    const before = await AccountTable.getAccountsById(payload.id)
    if (!before) {
      throw new Error('Account to delete not found')
    }
    await AccountTable.deleteAccount(payload.id)
    return { before }
  }
}

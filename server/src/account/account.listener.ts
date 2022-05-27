import { Account, CreateAccountPayload, UpdateAccountPayload } from '../../../contract/Account'
import { CommandAccountCreate, CommandAccountUpdate, CommandAccountDelete } from 'contract/Command'
import AccountTable from '../services/repository/db/account.db'
import { Changed } from '../../../contract/Event'
import EventService from '../services/event/event.service'

export class AccountListener {
  constructor() {
    EventService.onCommandHandler<CommandAccountCreate & { type: 'command' }>(
      'command.account.create',
      this.accountCreateHandler,
    )
    EventService.onCommandHandler<CommandAccountUpdate & { type: 'command' }>(
      'command.account.update',
      this.accountUpdateHandler,
    )
    EventService.onCommandHandler<CommandAccountDelete & { type: 'command' }>(
      'command.account.delete',
      this.accountDeleteHandler,
    )
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

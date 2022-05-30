import { Injectable } from '@nestjs/common'
import { AccountTable } from './db/account.db'
import { CompanyTable } from './db/company.db'
import { CustomerTable } from './db/customer.db'
import { InvoiceTable } from './db/invoice.db'
import { InvoicePositionsTable } from './db/invoicePositions.db'
import connection from './db/connection'

@Injectable()
export class RepositoryService {
  public account: AccountTable
  public company: CompanyTable
  public customer: CustomerTable
  public invoice: InvoiceTable
  public invoicePosition: InvoicePositionsTable

  constructor(
    account: AccountTable,
    company: CompanyTable,
    customer: CustomerTable,
    invoice: InvoiceTable,
    invoicePosition: InvoicePositionsTable,
  ) {
    this.account = account
    this.company = company
    this.customer = customer
    this.invoice = invoice
    this.invoicePosition = invoicePosition
  }
}

export default new RepositoryService(
  new AccountTable(connection),
  new CompanyTable(connection),
  new CustomerTable(connection),
  new InvoiceTable(connection),
  new InvoicePositionsTable(connection),
)

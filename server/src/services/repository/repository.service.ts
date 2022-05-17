import { Injectable } from '@nestjs/common'
import { AccountTable } from './db/account.db'
import { CompanyTable } from './db/company.db'
import { CustomerTable } from './db/customer.db'
import { InvoiceTable } from './db/invoice.db'
import { InvoicePositionsTable } from './db/invoicePositions.db'
import connection from './db/connection'

@Injectable()
export class RepositoryService {
  public account = new AccountTable(connection)
  public company = new CompanyTable(connection)
  public customer = new CustomerTable(connection)
  public invoice = new InvoiceTable(connection)
  public invoicePosition = new InvoicePositionsTable(connection)
}

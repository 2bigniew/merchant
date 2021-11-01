import { Injectable } from '@nestjs/common'
import { AccountTable } from '../../lib/db/account.db'
import { CompanyTable } from '../../lib/db/company.db'
import { CustomerTable } from '../../lib/db/customer.db'
import { InvoiceTable } from '../../lib/db/invoice.db'
import { InvoicePositionsTable } from '../../lib/db/invoicePositions.db'
import connection from '../../lib/db/connection'

@Injectable()
export class RepositoryService {
  public account = new AccountTable(connection)
  public company = new CompanyTable(connection)
  public customer = new CustomerTable(connection)
  public invoice = new InvoiceTable(connection)
  public invoicePosition = new InvoicePositionsTable(connection)
}

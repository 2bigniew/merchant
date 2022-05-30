import { Controller, Get, Param } from '@nestjs/common'
import { Company } from 'contract/Company'
import { RepositoryService } from '../services/repository/repository.service'

@Controller('/company')
export class CompanyController {
  constructor(private repository: RepositoryService) {}

  @Get('/list')
  getCompanyList(): Promise<Company[]> {
    return this.repository.company.getCompanies()
  }

  @Get('/id/:companyId')
  getCompany(@Param('companyId') companyId: number): Promise<Company | undefined> {
    return this.repository.company.getCompanyById(companyId)
  }
}

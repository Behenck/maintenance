import { Department } from '@modules/departments/infra/prisma/entities/Department'
import { IDepartmentsRepository } from '@modules/departments/repositories/IDepartmentsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchDepartmentsUseCase {
  /* eslint-disable */
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}
  /* eslint-enable */

  async execute(name: string): Promise<Department[]> {
    const departments = await this.departmentsRepository.search(name)

    return departments
  }
}

export { SearchDepartmentsUseCase }

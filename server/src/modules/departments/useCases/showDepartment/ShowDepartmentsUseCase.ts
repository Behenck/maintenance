import { Department } from '@modules/departments/infra/prisma/entities/Department'
import { IDepartmentsRepository } from '@modules/departments/repositories/IDepartmentsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ShowDepartmentsUseCase {
  /* eslint-disable */
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}
  /* eslint-enable */

  async execute(): Promise<Department[]> {
    const departments = await this.departmentsRepository.show()

    return departments
  }
}

export { ShowDepartmentsUseCase }

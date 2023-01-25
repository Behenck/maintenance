import { IDepartmentsRepository } from '@modules/departments/repositories/IDepartmentsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateDepartmentUseCase {
  /* eslint-disable */
   constructor(
    @inject('DepartmentsRepository')
    private departmentRepository: IDepartmentsRepository,
  ) {}
  /* eslint-enable */

  async execute(name: string): Promise<void> {
    await this.departmentRepository.create(name)
  }
}

export { CreateDepartmentUseCase }

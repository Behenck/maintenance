import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IDepartmentsRepository } from '@modules/departments/repositories/IDepartmentsRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  departmentName?: string
}

@injectable()
class CreateUserUseCase {
  /* eslint-disable */
  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository,
    @inject("DepartmentsRepository") 
    private departmentsRepository: IDepartmentsRepository
  ) {}
  /* eslint-enable */

  async execute({ name, departmentName }: IRequest): Promise<void> {
    let department = await this.departmentsRepository.findByName(departmentName)

    if (!department) {
      department = await this.departmentsRepository.create(departmentName)
    }

    await this.usersRepository.create({ name, departmentId: department?.id })
  }
}

export { CreateUserUseCase }

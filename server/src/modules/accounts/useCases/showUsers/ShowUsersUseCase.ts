import { User } from '@modules/accounts/infra/prisma/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ShowUsersUseCase {/* eslint-disable */
  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository
  ) {}

  /* eslint-enable */
  async execute(): Promise<User[]> {
    const users = await this.usersRepository.show()

    return users
  }
}

export { ShowUsersUseCase }

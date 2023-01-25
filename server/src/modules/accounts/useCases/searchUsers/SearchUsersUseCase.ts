import { User } from '@modules/accounts/infra/prisma/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchUsersUseCase {/* eslint-disable */
  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository
  ) {}

  /* eslint-enable */
  async execute(name: string): Promise<User[]> {
    const users = await this.usersRepository.search(name)

    return users
  }
}

export { SearchUsersUseCase }

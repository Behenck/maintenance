import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteUserUseCase {
  /* eslint-disable */
  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository,
  ) {}
  /* eslint-enable */

  async execute(userId: string): Promise<void> {
    await this.usersRepository.delete(userId)
  }
}

export { DeleteUserUseCase }

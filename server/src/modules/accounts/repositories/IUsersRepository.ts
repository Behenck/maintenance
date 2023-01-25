import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO'
import { User } from '../infra/prisma/entities/User'

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>
  show(): Promise<User[]>
  delete(userId: string): Promise<void>
  findByName(name: string): Promise<User | undefined>
  search(name: string): Promise<User[]>
}

export { IUsersRepository }

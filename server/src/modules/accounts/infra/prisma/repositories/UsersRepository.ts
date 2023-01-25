import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { prisma } from '@shared/infra/prisma'
import { User } from '../entities/User'

class UsersRepository implements IUsersRepository {
  async create(data: ICreateUsersDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        departmentId: data.departmentId,
      },
    })

    return user
  }

  async show(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc',
      },
      include: {
        department: true,
      },
    })

    return users
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({ where: { id: userId } })
  }

  async findByName(name: string): Promise<User | undefined> {
    const user = await prisma.user.findMany({
      take: 1,
      where: { name },
      include: { department: true },
    })

    return user[0]
  }

  async search(name: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: { department: true },
    })

    return users
  }
}

export { UsersRepository }

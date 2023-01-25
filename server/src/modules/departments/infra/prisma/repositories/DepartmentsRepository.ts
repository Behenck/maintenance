import { IDepartmentsRepository } from '@modules/departments/repositories/IDepartmentsRepository'
import { prisma } from '@shared/infra/prisma'
import { Department } from '../entities/Department'

class DepartmentsRepository implements IDepartmentsRepository {
  async create(name: string): Promise<Department> {
    const department = await prisma.department.create({
      data: {
        name,
      },
    })

    return department
  }

  async show(): Promise<Department[]> {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: 'desc',
      },
    })

    return departments
  }

  async findByName(name: string): Promise<Department | undefined> {
    const department = await prisma.department.findUnique({
      where: {
        name,
      },
    })

    return department
  }

  async search(name: string): Promise<Department[]> {
    const departments = await prisma.department.findMany({
      where: {
        name,
      },
    })

    return departments
  }
}

export { DepartmentsRepository }

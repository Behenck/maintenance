import { ICreateMaintenancesDTO } from '@modules/maintenances/dtos/ICreateMaintenancesDTO'
import {
  IMaintenancesRepository,
  IResponseGetLast,
} from '@modules/maintenances/repositories/IMaintenancesRepository'
import { prisma } from '@shared/infra/prisma'
import { Maintenance } from '../entities/Maintenance'

class MaintenancesRepository implements IMaintenancesRepository {
  async create(data: ICreateMaintenancesDTO): Promise<void> {
    await prisma.maintenance.create({
      data: {
        userId: data.userId,
        departmentId: data.departmentId,
        machineId: data.machineId,
        maintenanceDate: data.maintenanceDate,
        description: data.description,
      },
    })
  }

  async show(take?: string): Promise<Maintenance[]> {
    const maintenances = await prisma.maintenance.findMany({
      take: take ? Number(take) : 99999999999999,
      orderBy: {
        maintenanceDate: 'desc',
      },
      include: {
        user: true,
        department: true,
        machine: true,
      },
    })

    return maintenances
  }

  async delete(id: string): Promise<void> {
    await prisma.maintenance.delete({
      where: {
        id,
      },
    })
  }

  async update(
    maintenanceId: string,
    data: ICreateMaintenancesDTO,
  ): Promise<void> {
    await prisma.maintenance.update({
      where: {
        id: maintenanceId,
      },
      data,
    })
  }

  async findById(id: string): Promise<Maintenance> {
    const maintenance = await prisma.maintenance.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        department: true,
        machine: true,
      },
    })

    return maintenance
  }

  async getLast(): Promise<IResponseGetLast> {
    const maintenance = await prisma.maintenance.findMany({
      orderBy: {
        maintenanceDate: 'desc',
      },
      take: 1,
      include: {
        user: true,
        department: true,
      },
    })

    return maintenance[0]
  }

  async search(search: string): Promise<Maintenance[]> {
    const maintenances = await prisma.maintenance.findMany({
      where: {
        OR: [
          {
            machine: {
              ip: {
                contains: search,
              },
            },
          },
          {
            user: {
              name: {
                contains: search,
              },
            },
          },
          {
            department: {
              name: {
                contains: search,
              },
            },
          },
        ],
      },
      include: {
        machine: true,
        user: true,
        department: true,
      },
    })

    return maintenances
  }
}

export { MaintenancesRepository }

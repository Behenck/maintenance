import { IUpdateMachineDTOS } from '@modules/machines/dtos/IUpdateMachineDTOS'
import { IMachinesRepository } from '@modules/machines/repositories/IMachinesRepository'
import { prisma } from '@shared/infra/prisma'
import { ICreateMachineDTOS } from '../../dtos/ICreateMachineDTOS'
import { Machine } from '../entities/Machine'

class MachinesRepository implements IMachinesRepository {
  async create(data: ICreateMachineDTOS): Promise<void> {
    await prisma.machine.create({
      data: {
        ip: data.ip,
        processor: data.processor,
        memory: data.memory,
        storage: data.storage,
        system: data.system,
        font: data.font,
        motherboard: data.motherboard,
      },
    })
  }

  async show(): Promise<Machine[]> {
    const machines = await prisma.machine.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return machines
  }

  async update(id: string, data: IUpdateMachineDTOS): Promise<void> {
    await prisma.machine.update({
      where: {
        id,
      },
      data: {
        font: data.font,
        memory: data.memory,
        motherboard: data.motherboard,
        storage: data.storage,
        system: data.system,
        processor: data.processor,
      },
    })
  }

  async delete(ip: string): Promise<void> {
    await prisma.machine.delete({
      where: {
        ip,
      },
    })

    await prisma.ipAddress.delete({
      where: {
        ip,
      },
    })
  }

  async findByIp(ip: string): Promise<Machine | undefined> {
    const machine = prisma.machine.findUnique({ where: { ip } })
    return machine
  }

  async search(ip: string): Promise<Machine> {
    const machines = await prisma.machine.findUnique({
      where: {
        ip,
      },
    })

    return machines
  }
}

export { MachinesRepository }

import { IIpAddressRepository } from '@modules/machines/repositories/IIpAddressRepository'
import { prisma } from '@shared/infra/prisma'
import { ICreateIpAddressDTOS } from '../../dtos/ICreateIpAddressDTOS'
import { IpAddress } from '../entities/IpAddress'

class IpAddressRepository implements IIpAddressRepository {
  async create(data: ICreateIpAddressDTOS): Promise<void> {
    await prisma.ipAddress.create({
      data: {
        ip: data.ip,
        machineId: data.machineId,
      },
    })
  }

  async show(): Promise<IpAddress[]> {
    const ips = await prisma.ipAddress.findMany({
      orderBy: {
        ip: 'asc',
      },
    })

    return ips
  }

  async findByIP(ip: string): Promise<IpAddress> {
    const ipAddress = await prisma.ipAddress.findUnique({
      where: {
        ip,
      },
    })

    return ipAddress
  }
}

export { IpAddressRepository }

import { ICreateIpAddressDTOS } from '../infra/dtos/ICreateIpAddressDTOS'
import { IpAddress } from '../infra/prisma/entities/IpAddress'

interface IIpAddressRepository {
  create(data: ICreateIpAddressDTOS): Promise<void>
  show(): Promise<IpAddress[]>
  findByIP(ip: string): Promise<IpAddress>
}

export { IIpAddressRepository }

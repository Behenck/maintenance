import { IUpdateMachineDTOS } from '../dtos/IUpdateMachineDTOS'
import { ICreateMachineDTOS } from '../infra/dtos/ICreateMachineDTOS'
import { Machine } from '../infra/prisma/entities/Machine'

interface IMachinesRepository {
  create(data: ICreateMachineDTOS): Promise<void>
  show(): Promise<Machine[]>
  delete(ip: string): Promise<void>
  findByIp(ip: string): Promise<Machine | undefined>
  update(id: string, data: IUpdateMachineDTOS): Promise<void>
  search(ip: string): Promise<Machine>
}

export { IMachinesRepository }

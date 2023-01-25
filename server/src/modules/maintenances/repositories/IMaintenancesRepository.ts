import { ICreateMaintenancesDTO } from '../dtos/ICreateMaintenancesDTO'
import { Maintenance } from '../infra/prisma/entities/Maintenance'

export interface IResponseGetLast {
  id: string
  user: {
    name: string
  }
  department: {
    name: string
  }
  maintenanceDate: Date
}

interface IMaintenancesRepository {
  create(data: ICreateMaintenancesDTO): Promise<void>
  show(take?: string): Promise<Maintenance[]>
  delete(id: string): Promise<void>
  getLast(): Promise<IResponseGetLast | null>
  findById(id: string): Promise<Maintenance>
  update(maintenanceId: string, data: ICreateMaintenancesDTO): Promise<void>
  search(search: string): Promise<Maintenance[]>
}

export { IMaintenancesRepository }

import { Department } from '../infra/prisma/entities/Department'

interface IDepartmentsRepository {
  create(name: string): Promise<Department>
  show(): Promise<Department[]>
  findByName(name: string): Promise<Department | undefined>
  search(name: string): Promise<Department[]>
}

export { IDepartmentsRepository }

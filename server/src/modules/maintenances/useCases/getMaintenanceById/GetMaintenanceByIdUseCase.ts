import { Maintenance } from '@modules/maintenances/infra/prisma/entities/Maintenance'
import { IMaintenancesRepository } from '@modules/maintenances/repositories/IMaintenancesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetMaintenanceByIdUseCase {
  /* eslint-disable */
  constructor(
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}
  /* eslint-enable */

  async execute(id: string): Promise<Maintenance> {
    const maintenance = await this.maintenancesRepository.findById(id)

    return maintenance
  }
}

export { GetMaintenanceByIdUseCase }

import { Maintenance } from '@modules/maintenances/infra/prisma/entities/Maintenance'
import { IMaintenancesRepository } from '@modules/maintenances/repositories/IMaintenancesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchMaintenancesUseCase {/* eslint-disable */
  constructor(
    @inject("MaintenancesRepository") 
    private maintenancesRepository: IMaintenancesRepository
  ) {}

  /* eslint-enable */
  async execute(search: string): Promise<Maintenance[]> {
    const maintenances = await this.maintenancesRepository.search(search)

    return maintenances
  }
}

export { SearchMaintenancesUseCase }

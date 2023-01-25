import {
  IMaintenancesRepository,
  IResponseGetLast,
} from '@modules/maintenances/repositories/IMaintenancesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class GetLastMaintenanceUseCase {
  /* eslint-disable */
  constructor(
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}
  /* eslint-enable */

  async execute(): Promise<IResponseGetLast> {
    const lastMaintenance = await this.maintenancesRepository.getLast()

    return lastMaintenance
  }
}

export { GetLastMaintenanceUseCase }

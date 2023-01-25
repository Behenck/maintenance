import { IMaintenancesRepository } from '@modules/maintenances/repositories/IMaintenancesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteMaintenanceUseCase {
  /* eslint-disable */
  constructor(
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}
  /* eslint-enable */

  async execute(id: string): Promise<void> {
    await this.maintenancesRepository.delete(id)
  }
}

export { DeleteMaintenanceUseCase }

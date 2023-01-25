import { IMachinesRepository } from '@modules/machines/repositories/IMachinesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteMachineUseCase {
  /* eslint-disable */
  constructor(
    @inject("MachinesRepository") 
    private machineRepository: IMachinesRepository
  ) {}

  /* eslint-enable */

  async execute(ip: string): Promise<void> {
    await this.machineRepository.delete(ip)
  }
}
export { DeleteMachineUseCase }

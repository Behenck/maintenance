import { IMachinesRepository } from '@modules/machines/repositories/IMachinesRepository'
import { Machine } from '@modules/machines/infra/prisma/entities/Machine'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchMachinesUseCase {/* eslint-disable */
  constructor(
    @inject("MachinesRepository") 
    private machinesRepository: IMachinesRepository
  ) {}

  /* eslint-enable */
  async execute(ip: string): Promise<Machine> {
    const machine = await this.machinesRepository.search(ip)

    return machine
  }
}

export { SearchMachinesUseCase }

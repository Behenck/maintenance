import { Machine } from '@modules/machines/infra/prisma/entities/Machine'
import { IMachinesRepository } from '@modules/machines/repositories/IMachinesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ShowMachinesUseCase {
  /* eslint-disable */
  constructor(
    @inject('MachinesRepository')
    private machinesRepository: IMachinesRepository,
  ) {}

  /* eslint-enable */
  async execute(): Promise<Machine[]> {
    const machines = await this.machinesRepository.show()

    return machines
  }
}

export { ShowMachinesUseCase }

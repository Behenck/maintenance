import { IIpAddressRepository } from '@modules/machines/repositories/IIpAddressRepository'
import { IMachinesRepository } from '@modules/machines/repositories/IMachinesRepository'
import { AppError } from '@errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  ip: string
  processor?: string
  memory?: string
  storage?: string
  system?: string
  font?: string
  motherboard?: string
}

@injectable()
class CreateMachineUseCase {
  /* eslint-disable */
  constructor(
    @inject('MachinesRepository')
    private machinesRepository: IMachinesRepository,
    @inject('IpAddressRepository')
    private ipAddressRepository: IIpAddressRepository,
  ) {}

  /* eslint-enable */
  async execute(data: IRequest): Promise<void> {
    const ipAddress = await this.ipAddressRepository.findByIP(data.ip)

    if (ipAddress) {
      throw new AppError('Esse ip já foi cadastrado')
    }

    await this.ipAddressRepository.create({ ip: data.ip })

    await this.machinesRepository.create(data)
  }
}

export { CreateMachineUseCase }

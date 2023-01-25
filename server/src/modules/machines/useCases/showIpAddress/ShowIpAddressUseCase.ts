import { IpAddress } from '@modules/machines/infra/prisma/entities/IpAddress'
import { IIpAddressRepository } from '@modules/machines/repositories/IIpAddressRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ShowIpAddressUseCase {
  /* eslint-disable */
  constructor(
    @inject('IpAddressRepository')
    private ipAddressRepository: IIpAddressRepository,
  ) {}
  /* eslint-enable */

  async execute(): Promise<IpAddress[]> {
    const ips = await this.ipAddressRepository.show()

    return ips
  }
}

export { ShowIpAddressUseCase }

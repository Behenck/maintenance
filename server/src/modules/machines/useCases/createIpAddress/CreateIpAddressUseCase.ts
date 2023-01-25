import { ICreateIpAddressDTOS } from '@modules/machines/infra/dtos/ICreateIpAddressDTOS'
import { IIpAddressRepository } from '@modules/machines/repositories/IIpAddressRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateIpAddressUseCase {
  /* eslint-disable */
  constructor(
    @inject("IpAddressRepository") 
    private ipAddressRepository: IIpAddressRepository
  ) {}

  /* eslint-enable */

  async execute(data: ICreateIpAddressDTOS): Promise<void> {
    await this.ipAddressRepository.create(data)
  }
}
export { CreateIpAddressUseCase }

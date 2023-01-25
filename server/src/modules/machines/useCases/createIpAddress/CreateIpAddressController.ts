import { ICreateIpAddressDTOS } from '@modules/machines/infra/dtos/ICreateIpAddressDTOS'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateIpAddressUseCase } from './CreateIpAddressUseCase'

class CreateIpAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateIpAddressDTOS = request.body

    const createIpAddressUseCase = container.resolve(CreateIpAddressUseCase)

    await createIpAddressUseCase.execute(data)

    return response.status(201).send()
  }
}
export { CreateIpAddressController }

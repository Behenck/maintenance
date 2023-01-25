import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowIpAddressUseCase } from './ShowIpAddressUseCase'

class ShowIpAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showIpAddressUseCase = container.resolve(ShowIpAddressUseCase)

    const ips = await showIpAddressUseCase.execute()

    return response.json(ips)
  }
}

export { ShowIpAddressController }

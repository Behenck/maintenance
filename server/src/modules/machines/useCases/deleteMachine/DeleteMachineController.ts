import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteMachineUseCase } from './DeleteMachineUseCase'

class DeleteMachineController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { ip } = request.params

    const createIpAddressUseCase = container.resolve(DeleteMachineUseCase)

    await createIpAddressUseCase.execute(ip)

    return response.status(201).send()
  }
}
export { DeleteMachineController }

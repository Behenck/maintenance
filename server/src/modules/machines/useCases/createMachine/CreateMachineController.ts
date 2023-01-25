import { ICreateMachineDTOS } from '@modules/machines/infra/dtos/ICreateMachineDTOS'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateMachineUseCase } from './CreateMachineUseCase'

class CreateMachineController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateMachineDTOS = request.body

    const createMachineUseCase = container.resolve(CreateMachineUseCase)

    await createMachineUseCase.execute(data)

    return response.status(201).send()
  }
}

export { CreateMachineController }

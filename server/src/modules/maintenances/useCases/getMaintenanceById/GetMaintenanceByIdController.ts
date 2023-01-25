import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetMaintenanceByIdUseCase } from './GetMaintenanceByIdUseCase'

class GetMaintenanceByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getMaintenanceByIdUseCase = container.resolve(
      GetMaintenanceByIdUseCase,
    )

    const maintenance = await getMaintenanceByIdUseCase.execute(id)

    return response.json(maintenance)
  }
}

export { GetMaintenanceByIdController }

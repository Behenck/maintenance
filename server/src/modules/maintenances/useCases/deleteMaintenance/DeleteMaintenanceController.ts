import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteMaintenanceUseCase } from './DeleteMaintenanceUseCase'

class DeleteMaintenancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteMaintenanceUseCase = container.resolve(DeleteMaintenanceUseCase)

    await deleteMaintenanceUseCase.execute(id)

    return response.send()
  }
}

export { DeleteMaintenancesController }

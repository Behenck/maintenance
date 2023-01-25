import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetLastMaintenanceUseCase } from './GetLastMaintenanceUseCase'

class GetLastMaintenancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getLastMaintenanceUseCase = container.resolve(
      GetLastMaintenanceUseCase,
    )

    const lastMaintenance = await getLastMaintenanceUseCase.execute()

    return response.json(lastMaintenance)
  }
}

export { GetLastMaintenancesController }

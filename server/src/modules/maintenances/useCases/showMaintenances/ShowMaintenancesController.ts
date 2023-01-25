import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowMaintenancesUseCase } from './ShowMaintenancesUseCase'
import { Paginate } from '@shared/services/Paginate'

class ShowMaintenancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, per_page: perPage = 10 } = request.query

    const showMaintenancesUseCase = container.resolve(ShowMaintenancesUseCase)

    const maintenancesList = await showMaintenancesUseCase.execute()

    const totalCount = maintenancesList.length

    const maintenances = Paginate({ page, perPage, list: maintenancesList })

    return response.json({
      maintenances,
      totalCount,
    })
  }
}

export { ShowMaintenancesController }

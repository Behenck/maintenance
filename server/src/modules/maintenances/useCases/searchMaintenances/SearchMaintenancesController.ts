import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SearchMaintenancesUseCase } from './SearchMaintenancesUseCase'

class SearchMaintenancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.params

    const searchMaintenancesUseCase = container.resolve(
      SearchMaintenancesUseCase,
    )

    const maintenances = await searchMaintenancesUseCase.execute(search)

    return response.json(maintenances)
  }
}
export { SearchMaintenancesController }

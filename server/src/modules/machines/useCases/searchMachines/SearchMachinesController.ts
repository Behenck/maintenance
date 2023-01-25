import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SearchMachinesUseCase } from './SearchMachinesUseCase'

class SearchMachinesController {
  async handle(request: Request, response: Response) {
    const { ip } = request.params

    const searchMachinesUseCase = container.resolve(SearchMachinesUseCase)

    const machines = await searchMachinesUseCase.execute(ip)

    return response.json(machines)
  }
}
export { SearchMachinesController }

import { Paginate } from '@shared/services/Paginate'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowMachinesUseCase } from './ShowMachinesUseCase'

class ShowMachinesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, perPage = 10 } = request.query

    const showMachinesUseCase = container.resolve(ShowMachinesUseCase)

    const machinesList = await showMachinesUseCase.execute()

    const totalCount = machinesList.length
    const machines = Paginate({ page, perPage, list: machinesList })

    return response.json({
      machines,
      totalCount,
    })
  }
}

export { ShowMachinesController }

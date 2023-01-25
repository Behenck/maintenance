import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SearchDepartmentsUseCase } from './SearchDepartmentsUseCase'

class SearchDepartmentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params

    const searchDepartmentsUseCase = container.resolve(SearchDepartmentsUseCase)

    const departments = await searchDepartmentsUseCase.execute(name)

    return response.json(departments)
  }
}

export { SearchDepartmentsController }

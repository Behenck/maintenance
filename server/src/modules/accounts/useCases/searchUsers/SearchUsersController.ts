import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SearchUsersUseCase } from './SearchUsersUseCase'

class SearchUsersController {
  async handle(request: Request, response: Response) {
    const { userName } = request.params

    const searchUsersUseCase = container.resolve(SearchUsersUseCase)

    const users = await searchUsersUseCase.execute(userName)

    return response.json(users)
  }
}
export { SearchUsersController }

import { Paginate } from '@shared/services/Paginate'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowUsersUseCase } from './ShowUsersUseCase'

class ShowUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1, perPage = 10 } = request.query

    const showUsersUseCase = container.resolve(ShowUsersUseCase)

    const usersList = await showUsersUseCase.execute()

    const totalCount = usersList.length
    const users = Paginate({ page, perPage, list: usersList })

    return response.json({
      users,
      totalCount,
    })
  }
}
export { ShowUsersController }

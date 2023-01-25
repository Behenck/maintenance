import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteUserUseCase } from './DeleteUserUseCase'

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    await deleteUserUseCase.execute(userId)

    return response.status(201).send()
  }
}

export { DeleteUserController }

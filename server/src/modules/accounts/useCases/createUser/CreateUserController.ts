import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

interface IRequest {
  name: string
  departmentName: string
}

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, departmentName }: IRequest = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({ name, departmentName })

    return response.status(201).send()
  }
}

export { CreateUserController }

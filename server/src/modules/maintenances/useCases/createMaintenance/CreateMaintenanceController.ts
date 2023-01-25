import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateMaintenanceUseCase } from './CreateMaintenanceUseCase'

interface IRequest {
  ip: string
  departmentName: string
  userName: string
  maintenanceDate: string
  description: string
  font: string
  memory: string
  motherboard: string
  processor: string
  storage: string
  system: string
}

class CreateMaintenanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      userName,
      departmentName,
      ip,
      maintenanceDate,
      description,
      font,
      memory,
      motherboard,
      processor,
      storage,
      system,
    }: IRequest = request.body

    const createMaintenanceUseCase = container.resolve(CreateMaintenanceUseCase)

    await createMaintenanceUseCase.execute({
      userName,
      departmentName,
      ip,
      maintenanceDate,
      description,
      font,
      memory,
      motherboard,
      processor,
      storage,
      system,
    })

    return response.status(201).send()
  }
}

export { CreateMaintenanceController }

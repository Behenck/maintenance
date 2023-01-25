import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateMaintenanceUseCase } from './UpdateMaintenanceUseCase'

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

class UpdateMaintenanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

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

    const updateMaintenanceUseCase = container.resolve(UpdateMaintenanceUseCase)

    await updateMaintenanceUseCase.execute(id, {
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

export { UpdateMaintenanceController }

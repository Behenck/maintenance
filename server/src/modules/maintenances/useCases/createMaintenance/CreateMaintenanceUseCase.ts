import { AppError } from '../../../../shared/errors/AppError'
import { IMachinesRepository } from '@modules/machines/repositories/IMachinesRepository'
import { IDepartmentsRepository } from '@modules/departments/repositories/IDepartmentsRepository'
import { IIpAddressRepository } from '@modules/machines/repositories/IIpAddressRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IMaintenancesRepository } from '@modules/maintenances/repositories/IMaintenancesRepository'
import { inject, injectable } from 'tsyringe'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

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

@injectable()
class CreateMaintenanceUseCase {
  /* eslint-disable */
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('IpAddressRepository')
    private ipAddressRepository: IIpAddressRepository,
    @inject('MachinesRepository')
    private machinesRepository: IMachinesRepository,
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
    @inject('MaintenancesRepository')
    private maintenancesRepository: IMaintenancesRepository,
  ) {}
  /* eslint-enable */

  async execute({
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
  }: IRequest): Promise<void> {
    const department = await this.departmentsRepository.findByName(
      departmentName,
    )

    if (!department) {
      throw new AppError('Departamento não existente', 404)
    }

    let user = await this.usersRepository.findByName(userName)

    if (!user) {
      user = await this.usersRepository.create({
        name: userName,
        departmentId: department.id,
      })
    }

    const ipAddress = await this.ipAddressRepository.findByIP(ip)

    if (!ipAddress) {
      await this.ipAddressRepository.create({ ip })
      await this.machinesRepository.create({
        ip,
        font,
        memory,
        motherboard,
        processor,
        storage,
        system,
      })
    }

    const machine = await this.machinesRepository.findByIp(ip)

    if (
      machine.font !== font ||
      machine.memory !== memory ||
      machine.processor !== processor ||
      machine.storage !== storage ||
      machine.system !== system ||
      machine.motherboard !== motherboard
    ) {
      await this.machinesRepository.update(machine.id, {
        font,
        memory,
        processor,
        storage,
        system,
        motherboard,
      })
    }

    const serverTime = dayjs();
    const combinedDate = dayjs(maintenanceDate).set("hour", serverTime.hour()).set("minute", serverTime.minute()).set("second", serverTime.second());
    console.log(combinedDate)

    await this.maintenancesRepository.create({
      departmentId: department.id,
      userId: user.id,
      machineId: machine.id,
      maintenanceDate: combinedDate.toISOString(),
      description,
    })
  }
}

export { CreateMaintenanceUseCase }

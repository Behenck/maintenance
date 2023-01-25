import 'reflect-metadata'
import { container } from 'tsyringe'

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { DepartmentsRepository } from '@modules/departments/infra/prisma/repositories/DepartmentsRepository'
import { IDepartmentsRepository } from '@modules/departments/repositories/IDepartmentsRepository'

import { IpAddressRepository } from '@modules/machines/infra/prisma/repositories/IpAddressRepository'
import { IIpAddressRepository } from '@modules/machines/repositories/IIpAddressRepository'

import { MachinesRepository } from '@modules/machines/infra/prisma/repositories/MachinesRepository'
import { IMachinesRepository } from '@modules/machines/repositories/IMachinesRepository'

import { MaintenancesRepository } from '@modules/maintenances/infra/prisma/repositories/MaintenancesRepository'
import { IMaintenancesRepository } from '@modules/maintenances/repositories/IMaintenancesRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IDepartmentsRepository>(
  'DepartmentsRepository',
  DepartmentsRepository,
)

container.registerSingleton<IIpAddressRepository>(
  'IpAddressRepository',
  IpAddressRepository,
)

container.registerSingleton<IMachinesRepository>(
  'MachinesRepository',
  MachinesRepository,
)

container.registerSingleton<IMaintenancesRepository>(
  'MaintenancesRepository',
  MaintenancesRepository,
)

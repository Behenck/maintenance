import { Router } from 'express'
import { departmentsRouters } from './departments.routes'
import { ipAddressRouters } from './ipAddress.routes'
import { machinesRouters } from './machines.routes'
import { maintenancesRouters } from './maintenances.routes'
import { usersRouters } from './users.routes'

const router = Router()

router.use('/users', usersRouters)
router.use('/departments', departmentsRouters)
router.use('/ipAddress', ipAddressRouters)
router.use('/machines', machinesRouters)
router.use('/maintenances', maintenancesRouters)

export { router }

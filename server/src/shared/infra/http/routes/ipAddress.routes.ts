import Router from 'express'

import { CreateIpAddressController } from '@modules/machines/useCases/createIpAddress/CreateIpAddressController'
import { ShowIpAddressController } from '@modules/machines/useCases/showIpAddress/ShowIpAddressController'

const ipAddressRouters = Router()

const createIpAddressController = new CreateIpAddressController()
const showIpAddressController = new ShowIpAddressController()

ipAddressRouters.post('/', createIpAddressController.handle)
ipAddressRouters.get('/', showIpAddressController.handle)

export { ipAddressRouters }

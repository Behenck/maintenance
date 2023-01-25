import Router from 'express'

import { CreateMaintenanceController } from '@modules/maintenances/useCases/createMaintenance/CreateMaintenanceController'
import { ShowMaintenancesController } from '@modules/maintenances/useCases/showMaintenances/ShowMaintenancesController'
import { DeleteMaintenancesController } from '@modules/maintenances/useCases/deleteMaintenance/DeleteMaintenanceController'
import { GetLastMaintenancesController } from '@modules/maintenances/useCases/getLastMaintenance/GetLastMaintenanceController'
import { GetMaintenanceByIdController } from '@modules/maintenances/useCases/getMaintenanceById/GetMaintenanceByIdController'
import { UpdateMaintenanceController } from '@modules/maintenances/useCases/updateMaintenance/UpdateMaintenanceController'
import { SearchMaintenancesController } from '@modules/maintenances/useCases/searchMaintenances/SearchMaintenancesController'

const maintenancesRouters = Router()

const createMaintenanceController = new CreateMaintenanceController()
const showMaintenancesController = new ShowMaintenancesController()
const deleteMaintenanceController = new DeleteMaintenancesController()
const updateMaintenanceController = new UpdateMaintenanceController()
const getLastMaintenanceController = new GetLastMaintenancesController()
const getMaintenanceByIdController = new GetMaintenanceByIdController()
const searchMaintenancesController = new SearchMaintenancesController()

maintenancesRouters.get('/', showMaintenancesController.handle)
maintenancesRouters.post('/', createMaintenanceController.handle)
maintenancesRouters.delete('/:id', deleteMaintenanceController.handle)
maintenancesRouters.put('/:id', updateMaintenanceController.handle)
maintenancesRouters.get('/lastMaintenance', getLastMaintenanceController.handle)
maintenancesRouters.get('/:id', getMaintenanceByIdController.handle)
maintenancesRouters.get('/search/:search', searchMaintenancesController.handle)

export { maintenancesRouters }

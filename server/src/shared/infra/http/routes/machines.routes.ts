import Router from 'express'

import { CreateMachineController } from '@modules/machines/useCases/createMachine/CreateMachineController'
import { ShowMachinesController } from '@modules/machines/useCases/showMachines/ShowMachinesController'
import { DeleteMachineController } from '@modules/machines/useCases/deleteMachine/DeleteMachineController'
import { SearchMachinesController } from '@modules/machines/useCases/searchMachines/SearchMachinesController'

const machinesRouters = Router()

const createMachineController = new CreateMachineController()
const showMachinesController = new ShowMachinesController()
const searchMachinesController = new SearchMachinesController()
const deleteMachineController = new DeleteMachineController()

machinesRouters.post('/', createMachineController.handle)
machinesRouters.get('/', showMachinesController.handle)
machinesRouters.get('/:ip', searchMachinesController.handle)
machinesRouters.delete('/:ip', deleteMachineController.handle)

export { machinesRouters }

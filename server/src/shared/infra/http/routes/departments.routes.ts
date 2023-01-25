import { CreateDepartmentController } from '@modules/departments/useCases/createDepartment/CreateDepartmentController'
import { SearchDepartmentsController } from '@modules/departments/useCases/searchDepartment/SearchDepartmentsController'
import { ShowDepartmentsController } from '@modules/departments/useCases/showDepartment/ShowDepartmentsController'
import Router from 'express'

const departmentsRouters = Router()

const createDepartmentController = new CreateDepartmentController()
const showDepartmentController = new ShowDepartmentsController()
const searchDepartmentsController = new SearchDepartmentsController()

departmentsRouters.post('/', createDepartmentController.handle)
departmentsRouters.get('/', showDepartmentController.handle)
departmentsRouters.get('/:departmentName', searchDepartmentsController.handle)

export { departmentsRouters }

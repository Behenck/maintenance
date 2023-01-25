import Router from 'express'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { ShowUsersController } from '@modules/accounts/useCases/showUsers/ShowUsersController'
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController'
import { SearchUsersController } from '@modules/accounts/useCases/searchUsers/SearchUsersController'

const usersRouters = Router()

const createUserController = new CreateUserController()
const showUsersController = new ShowUsersController()
const searchUsersController = new SearchUsersController()
const deleteUserController = new DeleteUserController()

usersRouters.post('/', createUserController.handle)
usersRouters.get('/', showUsersController.handle)
usersRouters.get('/:userName', searchUsersController.handle)
usersRouters.delete('/:userId', deleteUserController.handle)

export { usersRouters }

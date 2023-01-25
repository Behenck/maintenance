import { useEffect, useState } from 'react'
import { Input } from '../../../../../components/Input'
import { api } from '../../../../../lib/api'
import { Maintenance } from '../../../../../services/hooks/maintenances/useMaintenances'

interface StepUserProps {
  register: any
  data: Maintenance
  onDepartmentIsValid: (valid: boolean) => void
}

interface User {
  id: string
  name: string
  department: {
    name: string
  }
}

interface Department {
  id: string
  name: string
}

export function StepUser({
  register,
  onDepartmentIsValid,
  data,
}: StepUserProps) {
  const [users, setUsers] = useState<User[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    const storageResponse = localStorage.getItem('DEPARTMENTS@maintenance1.0.0')
    if (storageResponse) {
      setDepartments(JSON.parse(storageResponse))
    }
  }, [])

  async function onBlurToSearchDepartmentWhereName(userName: string) {
    const user = await api.get(`/users/${userName}`)
    findUsers(userName)
    isValidDepartment()
    onDepartmentIsValid(!!user.data[0])
  }

  function onChangeDepartments(departmentName: string) {
    findDepartments()
    isValidDepartment(departmentName)
  }

  function isValidDepartment(name?: string) {
    const depName = name

    const existsDepartment = departments.find(
      (department) => department.name === depName,
    )
    if (existsDepartment) {
      onDepartmentIsValid(true)
    } else {
      onDepartmentIsValid(false)
    }
  }

  async function findUsers(searchUserName: string) {
    const response = await api.get(`/users/${searchUserName}`)
    setUsers(response.data)
  }

  async function findDepartments() {
    const storedDepartments = localStorage.getItem(
      'DEPARTMENTS@maintenance1.0.0',
    )
    if (storedDepartments) {
      const storedDepartmentsJSON = JSON.parse(storedDepartments)
      setDepartments(storedDepartmentsJSON)
    }
    isValidDepartment()
  }

  return (
    <>
      <Input
        name="userName"
        title="Usuário"
        isRequired
        list="usersList"
        register={register}
        onBlur={(e) => onBlurToSearchDepartmentWhereName(e.target.value)}
        defaultValue={data.user.name}
      />
      <datalist id="usersList">
        {users.map((user) => {
          return <option key={user.id} value={user.name} />
        })}
      </datalist>
      <Input
        name="departmentName"
        title="Setor"
        register={register}
        isRequired
        list="departmentsList"
        onChange={(e) => onChangeDepartments(e.target.value)}
        defaultValue={data.department.name}
      />
      <datalist id="departmentsList">
        {departments.map((department) => {
          return <option key={department.id} value={department.name} />
        })}
      </datalist>
    </>
  )
}

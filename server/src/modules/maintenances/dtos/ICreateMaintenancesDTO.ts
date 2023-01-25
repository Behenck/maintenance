interface ICreateMaintenancesDTO {
  userId: string
  departmentId: string
  machineId: string
  maintenanceDate: string
  description?: string
}

export { ICreateMaintenancesDTO }

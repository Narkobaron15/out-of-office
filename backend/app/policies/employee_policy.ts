import Employee from '#models/employee'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Position from '#types/position'

export default class EmployeePolicy extends BasePolicy {
  edit(user: Employee, employee: Employee | null | undefined): AuthorizerResponse {
    return user.role === Position.HR_MANAGER || user.id === employee?.id
  }

  create(user: Employee): AuthorizerResponse {
    return user.role === Position.HR_MANAGER
  }

  delete(user: Employee): AuthorizerResponse {
    return user.role === Position.HR_MANAGER
  }

  view(user: Employee): AuthorizerResponse {
    return user.role !== Position.EMPLOYEE
  }
}

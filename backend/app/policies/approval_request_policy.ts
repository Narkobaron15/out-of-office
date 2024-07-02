import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Employee from '#models/employee'
import Position from '#types/position'

export default class ApprovalRequestPolicy extends BasePolicy {
  open(user: Employee): AuthorizerResponse {
    return user.role !== Position.EMPLOYEE
  }

  approve(user: Employee): AuthorizerResponse {
    return user.role !== Position.EMPLOYEE
  }

  reject(user: Employee): AuthorizerResponse {
    return user.role !== Position.EMPLOYEE
  }
}

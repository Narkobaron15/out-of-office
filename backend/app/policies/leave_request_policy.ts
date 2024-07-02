import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Employee from "#models/employee";
import Position from "#types/position";

export default class LeaveRequestPolicy extends BasePolicy {
  open(user: Employee): AuthorizerResponse {
    return user.role === Position.EMPLOYEE
  }

  update(user: Employee): AuthorizerResponse {
    return user.role === Position.EMPLOYEE
  }

  submit(user: Employee): AuthorizerResponse {
    return user.role === Position.EMPLOYEE
  }

  cancel(user: Employee): AuthorizerResponse {
    return user.role === Position.EMPLOYEE
  }
}

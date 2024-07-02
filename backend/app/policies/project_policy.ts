import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Position from '#types/position'
import Employee from '#models/employee'
import Project from '#models/project'

export default class ProjectPolicy extends BasePolicy {
  viewAll(user: Employee): AuthorizerResponse {
    return user.role === Position.PROJECT_MANAGER
  }

  viewOfSubordinate(user: Employee): AuthorizerResponse {
    return user.role === Position.HR_MANAGER
  }

  viewRelated(user: Employee): AuthorizerResponse {
    return user.role === Position.EMPLOYEE
  }

  view(user: Employee, args: Project): AuthorizerResponse {
    return (
      (user.role === Position.PROJECT_MANAGER && args.manager.id === user.id) ||
      (user.role === Position.HR_MANAGER &&
        args.employees.find((x) => x.partner?.id === user.id) !== undefined) ||
      (user.role === Position.EMPLOYEE &&
        args.employees.find((x) => x.id === user.id) !== undefined)
    )
  }

  open(user: Employee): AuthorizerResponse {
    return user.role !== Position.EMPLOYEE
  }

  assign(user: Employee, args: Project): AuthorizerResponse {
    return user.role === Position.PROJECT_MANAGER && args.manager.id === user.id
  }

  update(user: Employee, args: Project): AuthorizerResponse {
    return user.role === Position.PROJECT_MANAGER && args.manager.id === user.id
  }

  delete(user: Employee, args: Project): AuthorizerResponse {
    return user.role === Position.PROJECT_MANAGER && args.manager.id === user.id
  }
}

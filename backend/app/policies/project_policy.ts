import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Position from '#types/position'
import Employee from '#models/employee'
import Project from "#models/project";

export default class ProjectPolicy extends BasePolicy {
  view(user: Employee, args: Project): AuthorizerResponse {
    return user.role !== Position.EMPLOYEE ||
      user.projects.map(x => x.id).includes(args.id)
  }

  open(user: Employee): AuthorizerResponse {
    return user.role !== Position.EMPLOYEE
  }

  assign(user: Employee): AuthorizerResponse {
    return user.role === Position.PROJECT_MANAGER
  }

  update(user: Employee): AuthorizerResponse {
    return user.role === Position.PROJECT_MANAGER
  }

  delete(user: Employee): AuthorizerResponse {
    return user.role === Position.PROJECT_MANAGER
  }
}

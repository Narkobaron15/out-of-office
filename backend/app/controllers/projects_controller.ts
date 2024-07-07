import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import Employee from '#models/employee'
import Pagination from '#types/pagination'

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({ auth, bouncer, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { page, limit, order } = request.qs()
    const pg = new Pagination({ page, limit, order })

    // find all projects that are managed by the project manager
    if (await bouncer.with('ProjectPolicy').allows('viewAll')) {
      const projects = await Project.query()
        .where('manager_id', user.id)
        .orderBy(pg.column, pg.direction)
        .preload('employees')
        .preload('manager')
        .paginate(pg.page, pg.limit)
      return projects.toJSON()
    }

    // find all projects that are assigned to the employees
    // whose coordinator is HR (user)
    if (await bouncer.with('ProjectPolicy').allows('viewOfSubordinate')) {
      const projects = await Project.query()
        .whereHas('employees', (builder) => {
          builder.where('partner_id', user.id)
        })
        .orderBy(pg.column, pg.direction)
        .paginate(pg.page, pg.limit)
      return projects.toJSON()
    }

    // find all projects that are assigned to the employee (user)
    if (await bouncer.with('ProjectPolicy').allows('viewRelated')) {
      const projects = await Project.query()
        .whereHas('employees', (builder) => {
          builder.where('employee_id', user.id)
        })
        .orderBy(pg.column, pg.direction)
        .paginate(pg.page, pg.limit)
      return projects.toJSON()
    }

    // if none of the above conditions are met, return forbidden
    return response.forbidden()
  }

  /**
   * Handle form submission for the creation action
   */
  async store({ bouncer, request }: HttpContext) {
    await bouncer.with('ProjectPolicy').authorize('open')

    const project = new Project()
    project.fill(request.all())
    await project.save()

    return project
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    try {
      const project = await Project.query()
        .where('id', params.id)
        .preload('employees')
        .preload('manager')
        .firstOrFail()

      const isAllowed = await bouncer.with('ProjectPolicy').allows('view', project)
      if (!isAllowed) {
        return response.forbidden()
      }

      return project
    } catch (error) {
      return response.notFound()
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    if (params.id !== request.all().id) {
      return response.badRequest('Cannot change the project ID')
    }

    let project: Project | null
    try {
      project = await Project.findOrFail(params.id)
    } catch (error) {
      return response.notFound()
    }
    await bouncer.with('ProjectPolicy').authorize('update', project)

    project.merge(request.all())
    await project.save()

    return project
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    let project: Project | null
    try {
      project = await Project.findOrFail(params.id)
    } catch (error) {
      return response.notFound()
    }
    await bouncer.with('ProjectPolicy').authorize('delete', project)
    await project.delete()
  }

  /**
   * Assign a project to an employee
   */
  async assign(ctx: HttpContext) {
    const response = await this.assignUnassignCore(ctx)
    if (!response) {
      return response
    }

    const { project, employee } = response
    await project.related('employees').attach([employee.id])
    return ctx.response.noContent()
  }

  /**
   * Remove an employee from a project
   */
  async unassign(ctx: HttpContext) {
    const response = await this.assignUnassignCore(ctx)
    if (!response) {
      return response
    }

    const { project, employee } = response
    await project.related('employees').detach([employee.id])
    return ctx.response.noContent()
  }

  private async assignUnassignCore({ bouncer, request, response }: HttpContext) {
    let project: Project | null
    try {
      project = await Project.findOrFail(request.all().project_id)
    } catch (error) {
      return response.notFound('Project not found')
    }

    await bouncer.with('ProjectPolicy').authorize('assign', project)

    let employee: Employee | null
    try {
      employee = await Employee.findOrFail(request.all().employee_id)
    } catch (error) {
      return response.notFound('Employee not found')
    }

    return { project, employee }
  }
}

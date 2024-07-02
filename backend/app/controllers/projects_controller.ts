import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import Employee from '#models/employee'
import Position from '#types/position'

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({ auth, bouncer, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { page, limit } = request.qs() as { page: number; limit: number }

    // find all projects that are managed by the project manager
    if (await bouncer.with('ProjectPolicy').allows('viewAll')) {
      const projects = await Project.query()
        .where('manager_id', user.id)
        .paginate(page ?? 1, limit ?? 10)
      return projects.toJSON()
    }

    // find all projects that are assigned to the employees
    // whose coordinator is HR (user)
    if (await bouncer.with('ProjectPolicy').allows('viewOfSubordinate')) {
      const projects = await Project.query()
        .whereHas('employees', (builder) => {
          builder.where('partner_id', user.id)
        })
        .paginate(page ?? 1, limit ?? 10)
      return projects.toJSON()
    }

    // find all projects that are assigned to the employee (user)
    if (await bouncer.with('ProjectPolicy').allows('viewRelated')) {
      const projects = await Project.query()
        .whereHas('employees', (builder) => {
          builder.where('employee_id', user.id)
        })
        .paginate(page ?? 1, limit ?? 10)
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
  async show({ bouncer, params }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await bouncer.with('ProjectPolicy').authorize('view', project)
    return project
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    if (params.id !== request.all().id) {
      return response.badRequest('Cannot change the project ID')
    }

    const project = await Project.findOrFail(params.id)
    await bouncer.with('ProjectPolicy').authorize('update', project)

    project.merge(request.all())
    await project.save()

    return project
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await bouncer.with('ProjectPolicy').authorize('delete', project)
    await project.delete()
  }

  /**
   * Assign a project to an employee
   */
  async assign({ bouncer, request, response }: HttpContext) {
    const project = await Project.findOrFail(request.all().project_id)
    await bouncer.with('ProjectPolicy').authorize('assign', project)

    const employee = await Employee.findOrFail(request.all().employee_id)
    if (employee.role !== Position.EMPLOYEE) {
      return response.badRequest('Only employees can be assigned to projects')
    }

    await project.related('employees').attach([employee.id])
    return response.noContent()
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import Employee from '#models/employee'
import Position from '#types/position'

export default class ProjectsController {
  /**
   * Display a list of resource
   */
  async index({ bouncer, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (await bouncer.with('ProjectPolicy').allows('viewAll')) {
      return await Project.findManyBy('manager_id', user.id)
    }

    if (await bouncer.with('ProjectPolicy').allows('viewOfSubordinate')) {
      // find all projects that are asssigned to the employees
      // whose coordinator is HR (user)

      return await Project.query()
        .whereHas('employees', (builder) => {
          builder.where('partner_id', user.id)
        })
        .exec()
    }

    if (await bouncer.with('ProjectPolicy').allows('viewRelated')) {
      // find all projects that are asssigned to the employee (user)
      return await Project.query()
        .whereHas('employees', (builder) => {
          builder.where('employee_id', user.id)
        })
        .exec()
    }

    return response.forbidden()
  }

  /**
   * Handle form submission for the create action
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

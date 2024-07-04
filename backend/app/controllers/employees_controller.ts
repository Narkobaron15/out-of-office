import type { HttpContext } from '@adonisjs/core/http'
import Employee from '#models/employee'
import Pagination from '#types/pagination'
import bucket from '../files/bucket.js'
import { cuid } from '@adonisjs/core/helpers'
import * as fs from 'node:fs'
import { Request } from '@adonisjs/http-server'
import sharp from 'sharp'

export default class EmployeesController {
  private static readonly DEFAULT_AVATAR_URL =
    'https://img.icons8.com/?size=128&id=tZuAOUGm9AuS&format=png'

  private static async uploadAvatar(request: Request, employee: Employee) {
    if (!request.file('avatar')) {
      // set a default picture
      employee.pictureUrl = EmployeesController.DEFAULT_AVATAR_URL
      return
    }

    const avatar = request.file('avatar', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg', 'svg', 'jfif', 'webp', 'avif'],
    })

    if (!avatar) {
      if (!employee.pictureUrl) {
        employee.pictureUrl = EmployeesController.DEFAULT_AVATAR_URL
      }
      return { error: 'No file was uploaded' }
    }
    if (!avatar.isValid) {
      if (!employee.pictureUrl) {
        employee.pictureUrl = EmployeesController.DEFAULT_AVATAR_URL
      }
      return avatar.errors
    }

    // create tmp directory if it doesn't exist
    if (!fs.existsSync('/tmp')) {
      await fs.promises.mkdir('/tmp')
      await fs.promises.mkdir('/tmp/compressed')
    }
    const fileName = `${cuid()}.${avatar.extname}`
    await avatar.move('/tmp', { name: fileName })
    await sharp(`/tmp/${fileName}`)
      .resize(128, 128)
      .jpeg({ quality: 90 })
      .toFile(`/tmp/compressed/${fileName}`)

    const [file] = await bucket.upload(`/tmp/compressed/${fileName}`, {
      destination: `avatars/${fileName}`,
      metadata: {
        contentType: avatar.headers['content-type'],
      },
    })
    await file.makePublic()
    employee.pictureUrl = file.publicUrl()

    // remove the temporary file from the filesystem
    await fs.promises.unlink(`/tmp/${fileName}`)
    await fs.promises.unlink(`/tmp/compressed/${fileName}`)
  }

  private static async deleteAvatar(request: Request, employee: Employee) {
    if (
      (request.all()['delete_avatar'] === 'true' || request.file('avatar')) &&
      employee.pictureUrl
    ) {
      const filename = 'avatars/' + employee.pictureUrl.split('/').pop()!
      await bucket.file(filename).delete()
    }
    employee.pictureUrl = undefined
  }

  /**
   * Display a list of resource
   */
  async index({ auth, bouncer, request }: HttpContext) {
    await bouncer.with('EmployeePolicy').authorize('view')
    const user = await auth.authenticate()

    // paginated results
    const pg = request.qs() as Pagination
    const employees = await Employee.query()
      .where('partner_id', user.id)
      .orderBy(pg.column, pg.direction)
      .preload('projects')
      .paginate(pg.page ?? 1, pg.limit ?? 10)

    return employees.toJSON()
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params }: HttpContext) {
    await bouncer.with('EmployeePolicy').authorize('view')
    return await Employee.query().where('id', params.id).preload('projects').firstOrFail()
  }

  /**
   * Handle form submission for the creation action
   */
  async store({ bouncer, auth, request }: HttpContext) {
    await bouncer.with('EmployeePolicy').authorize('create')

    const user = await auth.authenticate()
    const employee = new Employee()
    employee.fill({ ...request.all(), partner_id: user.id })
    await EmployeesController.uploadAvatar(request, employee)
    await employee.save()

    return employee
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    if (params.id !== request.all().id) {
      return response.badRequest('Cannot change the project ID')
    }

    await bouncer.with('EmployeePolicy').authorize('edit', await Employee.find(params.id))

    const employee = await Employee.findOrFail(params.id)
    employee.merge(request.all())
    await EmployeesController.deleteAvatar(request, employee)
    await EmployeesController.uploadAvatar(request, employee)
    await employee.save()

    return employee
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, request, response, params }: HttpContext) {
    await bouncer.with('EmployeePolicy').authorize('delete')

    const employee = await Employee.find(params.id)
    if (!employee) {
      return response.notFound('Employee not found')
    }

    await EmployeesController.deleteAvatar(request, employee)
    await employee.delete()

    return response.noContent()
  }
}

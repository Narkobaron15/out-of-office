import type { HttpContext } from '@adonisjs/core/http'
import LeaveRequest from '#models/leave_request'
import Status from '#types/status'
import Pagination from '#types/pagination'

export default class LeaveRequestsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const pg = request.qs() as Pagination
    const requests = await LeaveRequest.query()
      .orderBy(pg.column, pg.direction)
      .preload('employee')
      .paginate(pg.page ?? 1, pg.limit ?? 10)
    return requests.toJSON()
  }

  /**
   * Handle form submission for the creation action
   */
  async store({ bouncer, request }: HttpContext) {
    await bouncer.with('LeaveRequestPolicy').authorize('open')

    const leaveRequest = new LeaveRequest()
    leaveRequest.fill(request.all())
    await leaveRequest.save()

    return leaveRequest
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await LeaveRequest.query().where('id', params.id).preload('employee').firstOrFail()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    if (params.id !== request.all().id) {
      return response.badRequest('Cannot change the project ID')
    }

    await bouncer.with('LeaveRequestPolicy').authorize('update')

    const leaveRequest = await LeaveRequest.findOrFail(params.id)
    leaveRequest.merge(request.all())
    await leaveRequest.save()

    return leaveRequest
  }

  /**
   * Cancel record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    await bouncer.with('LeaveRequestPolicy').authorize('cancel')

    const record = await LeaveRequest.findOrFail(params.id)
    record.merge({ status: Status.CANCELLED })
    await record.save()

    return response.noContent()
  }
}

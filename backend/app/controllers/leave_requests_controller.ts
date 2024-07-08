import type { HttpContext } from '@adonisjs/core/http'
import LeaveRequest from '#models/leave_request'
import Status from '#types/status'
import Pagination from '#types/pagination'

export default class LeaveRequestsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const { page, limit, order } = request.qs()
    const pg = new Pagination({ page, limit, order })
    const requests = await LeaveRequest.query()
      .orderBy(pg.column, pg.direction)
      .preload('employee')
      .paginate(pg.page, pg.limit)
    return requests.toJSON()
  }

  /**
   * Handle form submission for the creation action
   */
  async store({ auth, bouncer, request }: HttpContext) {
    await bouncer.with('LeaveRequestPolicy').authorize('open')
    const user = auth.getUserOrFail()

    const leaveRequest = new LeaveRequest()
    leaveRequest.fill({
      ...request.all(),
      status: Status.NEW,
      employeeId: user.id,
    })
    await leaveRequest.save()

    return leaveRequest
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      return await LeaveRequest.query().where('id', params.id).preload('employee').firstOrFail()
    } catch (error) {
      return response.notFound()
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    if (request.all().id && params.id !== request.all().id) {
      return response.badRequest('Cannot change the leave request ID')
    }

    await bouncer.with('LeaveRequestPolicy').authorize('update')

    try {
      const leaveRequest = await LeaveRequest.findOrFail(params.id)
      leaveRequest.merge(request.all())
      await leaveRequest.save()

      return leaveRequest
    } catch (error) {
      return response.notFound()
    }
  }

  /**
   * Cancel record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    await bouncer.with('LeaveRequestPolicy').authorize('cancel')

    try {
      const record = await LeaveRequest.findOrFail(params.id)
      record.merge({ status: Status.CANCELLED })
      await record.save()

      return response.noContent()
    } catch (error) {
      return response.notFound()
    }
  }
}

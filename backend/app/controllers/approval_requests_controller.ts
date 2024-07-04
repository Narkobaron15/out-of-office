import type { HttpContext } from '@adonisjs/core/http'
import ApprovalRequest from '#models/approval_request'
import Status from '#types/status'
import Pagination from '#types/pagination'

export default class ApprovalRequestsController {
  /**
   * Display a list of resource
   */
  async index({ auth, bouncer, request }: HttpContext) {
    await bouncer.with('ApprovalRequestPolicy').authorize('open')

    const user = await auth.authenticate()
    const { page, limit, order } = request.qs()
    const pg = new Pagination({ page, limit, order })
    const requests = await ApprovalRequest.query()
      .where('approver_id', user.id)
      .orderBy(pg.column, pg.direction)
      .preload('leaveRequest')
      .preload('approver')
      .paginate(pg.page, pg.limit)

    return requests.toJSON()
  }

  /**
   * Handle form submission for the creation action
   */
  async store({ bouncer, request }: HttpContext) {
    await bouncer.with('ApprovalRequestPolicy').authorize('create')

    const approvalRequest = new ApprovalRequest()
    approvalRequest.fill({ ...request.all(), status: Status.NEW })
    await approvalRequest.save()

    return approvalRequest
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    await bouncer.with('ApprovalRequestPolicy').authorize('open')
    try {
      return await ApprovalRequest.query()
        .where('id', params.id)
        .preload('leaveRequest')
        .preload('approver')
        .firstOrFail()
    } catch (error) {
      return response.notFound()
    }
  }

  /**
   * Approve the request
   */
  async approve({ bouncer, params, response }: HttpContext) {
    await bouncer.with('ApprovalRequestPolicy').authorize('approve')

    try {
      const req = await ApprovalRequest.findOrFail(params.id)
      req.merge({ status: Status.APPROVED })
      await req.save()
      return req
    } catch (error) {
      return response.notFound()
    }
  }

  /**
   * Reject the request
   */
  async reject({ bouncer, params, response }: HttpContext) {
    await bouncer.with('ApprovalRequestPolicy').authorize('reject')

    try {
      const req = await ApprovalRequest.findOrFail(params.id)
      req.merge({ status: Status.REJECTED })
      await req.save()

      return req
    } catch (error) {
      return response.notFound()
    }
  }
}

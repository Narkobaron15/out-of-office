import type { HttpContext } from '@adonisjs/core/http'

export default class NotFoundController {
  async handle({ response }: HttpContext) {
    return response.notFound({
      error: '404 Not Found',
    })
  }
}

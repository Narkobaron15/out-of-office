import type { HttpContext } from '@adonisjs/core/http'
import Employee from '#models/employee'

export default class SessionController {
  async login({ auth, request, response }: HttpContext) {
    const { username, password } = request.all()
    const user = await Employee.verifyCredentials(username, password)
    await auth.use('web').login(user, true)
    return response.noContent()
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.noContent()
  }

  async check({ auth, response }: HttpContext) {
    const user = await auth.use('web').authenticate()
    return response.json(user)
  }

  // async register({ auth, request, response }: HttpContext) {
  //   const newbie = request.all()
  //   const user = await Employee.create(newbie)
  //   await auth.use('web').login(user, true)
  //   return response.noContent()
  // }
}

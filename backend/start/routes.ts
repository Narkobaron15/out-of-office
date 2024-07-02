/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// API Routes
router
  .group(() => {
    // unauthenticated only routes group
    router
      .group(() => {
        router.post('login', 'SessionController.login')
        router.post('register', 'SessionController.register')
        router.post('logout', 'SessionController.logout')
      })
      .use(middleware.guest())

    // authenticated only routes group
    router
      .group(() => {
        router.get('check', 'SessionController.check')


      })
      .use(middleware.auth())
  })
  .prefix('api/v1')

// 404
router.any('*', async ({ response }) => {
  return response.notFound({
    error: '404 Not Found',
  })
})

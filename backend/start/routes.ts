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
      .prefix('auth')
      .use(middleware.guest())

    // authenticated only routes group
    router
      .group(() => {
        router.get('check', 'SessionController.check').prefix('auth')
        router.resource('employees', 'EmployeesController')
        router.resource('projects', 'ProjectsController')
        router.get('projects/assign', 'ProjectsController.assign')
        router.resource('leave-requests', 'LeaveRequestsController')
        router // approval requests
          .group(() => {
            router.get('', 'ApprovalRequestsController.index')
            router.get(':id', 'ApprovalRequestsController.show')
            router.post('', 'ApprovalRequestsController.store')
            router.post('approve', 'ApprovalRequestsController.approve')
            router.post('reject', 'ApprovalRequestsController.reject')
          })
          .prefix('approval-requests')
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

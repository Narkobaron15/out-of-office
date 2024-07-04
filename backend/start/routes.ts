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

const SessionController = () => import('#controllers/session_controller')
const NotFoundController = () => import('#controllers/not_found_controller')
const ApprovalRequestsController = () => import('#controllers/approval_requests_controller')
const LeaveRequestsController = () => import('#controllers/leave_requests_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const EmployeesController = () => import('#controllers/employees_controller')

// API Routes
router
  .group(() => {
    // authorization routes group
    router
      .group(() => {
        router.post('login', [SessionController, 'login']).use(middleware.guest())
        // router.post('register', [SessionController, 'register']).use(middleware.guest())
        router.post('logout', [SessionController, 'logout']).use(middleware.auth())
      })
      .prefix('auth')

    // authenticated only routes group
    router
      .group(() => {
        router.get('check', [SessionController, 'check']).prefix('auth')
        router.resource('employees', EmployeesController).apiOnly()
        router.resource('projects', ProjectsController).apiOnly()
        router.get('projects/assign', [ProjectsController, 'assign'])
        router.resource('leave-requests', LeaveRequestsController).apiOnly()
        router // approval requests
          .group(() => {
            router.get('', [ApprovalRequestsController, 'index'])
            router.get(':id', [ApprovalRequestsController, 'show'])
            router.post('', [ApprovalRequestsController, 'store'])
            router.post('approve', [ApprovalRequestsController, 'approve'])
            router.post('reject', [ApprovalRequestsController, 'reject'])
          })
          .prefix('approval-requests')
      })
      .use(middleware.auth())
  })
  .prefix('api/v1')

// 404
router.any('*', NotFoundController)

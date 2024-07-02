/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', async () => {
      return { hello: 'world' }
    })
  })
  .prefix('api/v1')

// 404
router.any('*', async ({ response }) => {
  return response.notFound({
    error: '404 Not Found',
  })
})

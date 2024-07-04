export default class Pagination {
  page: number
  limit: number
  order: `${string},${string}`

  constructor({
    page,
    limit,
    order,
  }: {
    page: number
    limit: number
    order: `${string},${string}`
  }) {
    this.page = page ?? 1
    this.limit = limit ?? 10
    this.order = order
  }

  get column() {
    if (!this.order || this.order.split(',').length < 2) {
      return 'created_at' // default column
    }
    return this.order.split(',')[0]
  }

  get direction(): 'asc' | 'desc' {
    if (!this.order || this.order.split(',').length < 2) {
      return 'desc'
    }
    if (this.order.split(',')[1] === 'asc') {
      return 'asc'
    }
    return 'desc'
  }
}

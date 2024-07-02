export default class Pagination {
  declare page: number

  declare limit: number

  declare order: `${string},${string}`

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

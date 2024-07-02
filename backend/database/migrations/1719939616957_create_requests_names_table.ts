import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('leave_requests', (table) => {
      table.text('short_name').notNullable()
      table.text('comment').nullable().alter()
    })
    this.schema.alterTable('approval_requests', (table) => {
      table.text('short_name').notNullable()
      table.text('comment').nullable()
    })
  }

  async down() {
    this.schema.alterTable('leave_requests', (table) => {
      table.dropColumn('short_name')
      table.text('comment').notNullable().alter()
    })
    this.schema.alterTable('approval_requests', (table) => {
      table.dropColumn('short_name')
      table.dropColumn('comment')
    })
  }
}

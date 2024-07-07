import AbsenceReason from '#types/absence_reason'
import Position from '#types/position'
import ProjectType from '#types/project_type'
import Status from '#types/status'
import Subdivision from '#types/subdivision'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('employees', (table) => {
      table.uuid('id').primary().index()
      table.string('email', 255).notNullable().unique()
      table.string('password', 500).notNullable()
      table.string('full_name', 180).notNullable()
      table.enum('role', Object.values(Position)).notNullable()
      table.enum('subdivision', Object.values(Subdivision)).notNullable()
      table.boolean('status').notNullable()
      table.integer('days_off').notNullable().checkPositive()
      table.string('picture_url').nullable()
      table.uuid('partner_id').references('id').inTable('employees').onDelete('CASCADE').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('leave_requests', (table) => {
      table.uuid('id').primary().index()
      table.uuid('employee_id').references('id').inTable('employees').onDelete('CASCADE')
      table.enum('absence_reason', Object.values(AbsenceReason)).notNullable()
      table.date('start').notNullable()
      table.date('end').notNullable()
      table.text('comment').notNullable()
      table.enum('status', Object.values(Status)).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('approval_requests', (table) => {
      table.uuid('id').primary().index()
      table.uuid('approver_id').references('id').inTable('employees').onDelete('CASCADE')
      table.uuid('leave_request_id').references('id').inTable('leave_requests').onDelete('CASCADE')
      table.enum('status', Object.values(Status)).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('projects', (table) => {
      table.uuid('id').primary().index()
      table.string('name', 180).notNullable()
      table.enum('type', Object.values(ProjectType)).notNullable()
      table.date('start').notNullable()
      table.date('end').notNullable()
      table.uuid('manager_id').references('id').inTable('employees').onDelete('CASCADE')
      table.text('comment').nullable()
      table.boolean('status').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable('projects')
    this.schema.dropTable('approval_requests')
    this.schema.dropTable('leave_requests')
    this.schema.dropTable('employees')
  }
}

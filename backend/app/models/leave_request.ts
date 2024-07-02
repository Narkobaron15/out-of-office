import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Employee from '#models/employee'
import AbsenceReason from '#types/absence_reason'
import Status from '#types/status'
import type { UUID } from 'node:crypto'

export default class LeaveRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @hasOne(() => Employee)
  declare employee: HasOne<typeof Employee>

  @column()
  declare absenceReason: AbsenceReason

  @column.date()
  declare start: DateTime

  @column.date()
  declare end: DateTime

  @column()
  declare comment: string

  @column()
  declare status: Status

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

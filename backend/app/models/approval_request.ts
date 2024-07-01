import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import LeaveRequest from '#models/leave_request'
import Status from '#types/status'
import type { UUID } from 'crypto'

export default class ApprovalRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @hasOne(() => User)
  declare approver: HasOne<typeof User>

  @hasOne(() => LeaveRequest)
  declare leaveRequest: HasOne<typeof LeaveRequest>

  @column()
  declare status: Status

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Employee from '#models/employee'
import LeaveRequest from '#models/leave_request'
import Status from '#types/status'
import * as nodeCrypto from 'node:crypto'

export default class ApprovalRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: nodeCrypto.UUID

  @belongsTo(() => Employee, { foreignKey: 'approverId' })
  declare approver: BelongsTo<typeof Employee>

  @column({ serializeAs: null })
  declare approverId: nodeCrypto.UUID

  @belongsTo(() => LeaveRequest)
  declare leaveRequest: BelongsTo<typeof LeaveRequest>

  @column({ serializeAs: null })
  declare leaveRequestId: nodeCrypto.UUID

  @column()
  declare status: Status

  @column()
  declare shortName: string

  @column()
  declare comment: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async createUUID(model: ApprovalRequest) {
    model.id = nodeCrypto.randomUUID()
  }
}

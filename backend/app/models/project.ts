import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import ProjectType from '#types/project_type'
import User from '#models/user'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'crypto'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare name: string

  @column()
  declare type: ProjectType

  @column.date()
  declare start: DateTime

  @column.date()
  declare end: DateTime

  @hasOne(() => User)
  declare manager: HasOne<typeof User>

  @column()
  declare comment?: string

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

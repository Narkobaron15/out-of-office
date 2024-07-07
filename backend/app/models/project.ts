import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import ProjectType from '#types/project_type'
import Employee from '#models/employee'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import * as nodeCrypto from 'node:crypto'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: nodeCrypto.UUID

  @column()
  declare name: string

  @column()
  declare type: ProjectType

  @column.date()
  declare start: DateTime

  @column.date()
  declare end: DateTime

  @belongsTo(() => Employee, {
    foreignKey: 'managerId',
  })
  declare manager: BelongsTo<typeof Employee>

  @column()
  declare managerId: nodeCrypto.UUID

  @column()
  declare comment?: string

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Employee, {
    pivotTable: 'project_employees',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'project_id',
    pivotRelatedForeignKey: 'employee_id',
  })
  declare employees: ManyToMany<typeof Employee>

  @beforeCreate()
  static async createUUID(model: Project) {
    model.id = nodeCrypto.randomUUID()
  }
}

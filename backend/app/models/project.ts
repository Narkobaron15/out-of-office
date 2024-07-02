import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import ProjectType from '#types/project_type'
import Employee from '#models/employee'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import type { UUID } from 'node:crypto'

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

  @hasOne(() => Employee)
  declare manager: HasOne<typeof Employee>

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
}

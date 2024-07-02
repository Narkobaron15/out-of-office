import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Position from '#types/position'
import type { UUID } from 'node:crypto'
import Subdivision from '#types/subdivision'
import Project from '#models/project'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

/**
 * Employee model
 */
export default class Employee extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: UUID

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare subdivision: Subdivision

  @column({ serializeAs: 'position' })
  declare role: Position

  @column()
  declare status: boolean

  @hasOne(() => Employee)
  declare partner: HasOne<typeof Employee>

  @column()
  declare daysOff: number

  @column()
  declare pictureUrl?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Project, {
    pivotTable: 'project_employees',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'employee_id',
    pivotRelatedForeignKey: 'project_id',
  })
  declare projects: ManyToMany<typeof Project>
}

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Position from '#types/position'
import nodeCrypto from 'node:crypto'
import Subdivision from '#types/subdivision'
import Project from '#models/project'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

/**
 * Employee model
 */
export default class Employee extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: nodeCrypto.UUID

  @column()
  declare fullName: string

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
  declare partner: HasOne<typeof Employee> | null

  @column()
  declare partnerId: nodeCrypto.UUID | null

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

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(Employee)

  @beforeCreate()
  static async createUUID(model: Employee) {
    model.id = nodeCrypto.randomUUID()
  }
}

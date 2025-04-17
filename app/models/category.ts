import { DateTime } from 'luxon'
import { BaseModel, hasMany, belongsTo, column } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Session from './session.js'
import Nominee from './nominee.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare shortDescription: string | null

  @column()
  declare fullDescription: string | null

  @column()
  declare sessionId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Session)
  declare session: BelongsTo<typeof Session>

  @hasMany(() => Nominee)
  declare nominees: HasMany<typeof Nominee>
}

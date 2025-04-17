import { DateTime } from 'luxon'
import { BaseModel, hasMany, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Session from './session.js'
import Vote from './vote.js'

export default class Pack extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sessionId: number

  @column()
  declare voteCount: number

  @column()
  declare amount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Session)
  declare session: BelongsTo<typeof Session>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>
}

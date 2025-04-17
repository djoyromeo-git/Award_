import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Country from './country.js'
import Session from './session.js'

export default class Judge extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare judiable: 'person' | 'structure'

  @column()
  declare countryId: number

  @column()
  declare sessionId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => Session)
  declare session: BelongsTo<typeof Session>
}
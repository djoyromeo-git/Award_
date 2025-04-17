import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Country from './country.js'
import Phone from './phone.js'

export default class Structure extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare photo: string | null

  @column()
  declare website: string | null

  @column()
  declare countryId: number

  @column()
  declare phoneId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => Phone)
  declare phone: BelongsTo<typeof Phone>
}
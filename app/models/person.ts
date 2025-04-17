import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Phone from './phone.js'
import User from './user.js'
import Country from './country.js'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare middleName: string | null

  @column()
  declare website: string | null

  @column()
  declare poste: string | null

  @column()
  declare description: string | null

  @column()
  declare photo: string | null

  @column()
  declare phoneId: number

  @column()
  declare userId: number

  @column()
  declare countryId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Phone)
  declare phone: BelongsTo<typeof Phone>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>
}
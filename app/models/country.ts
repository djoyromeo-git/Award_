import { DateTime } from 'luxon'
import { BaseModel, hasMany, column } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Structure from './structure.js'
import Judge from './judge.js'
import Person from './person.js'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Structure)
  declare structures: HasMany<typeof Structure>

  @hasMany(() => Judge)
  declare judges: HasMany<typeof Judge>

  @hasMany(() => Person)
  declare people: HasMany<typeof Person>
}
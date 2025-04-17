import { DateTime } from 'luxon'
import { BaseModel, hasMany, column } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Structure from './structure.js'
import Person from './person.js'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Structure)
  declare structures: HasMany<typeof Structure>

  @hasMany(() => Person)
  declare people: HasMany<typeof Person>
}
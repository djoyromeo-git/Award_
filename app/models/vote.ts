import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Nominee from './nominee.js'
import Pack from './pack.js'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nomineeId: number

  @column()
  declare packId: number

  @column()
  declare fullname: string

  @column()
  declare email: string

  @column()
  declare phone: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Nominee)
  declare nominee: BelongsTo<typeof Nominee>

  @belongsTo(() => Pack)
  declare pack: BelongsTo<typeof Pack>
}
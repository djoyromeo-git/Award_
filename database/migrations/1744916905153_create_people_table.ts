import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'people'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('middle_name').nullable()
      table.string('website').nullable()
      table.string('poste').nullable()
      table.text('description').nullable()
      table.string('photo').nullable()
      table.integer('phone_id')
      table.integer('user_id')
      table.integer('country_id')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
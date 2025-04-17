import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Structure from 'App/Models/structure'

export default class StructuresController {
  public async index({ response }: HttpContextContract) {
    const structures = await Structure.query().preload('country').preload('phone')
    return response.json(structures)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'photo', 'website', 'country_id', 'phone_id'])
    const structure = await Structure.create(data)
    await structure.load('country')
    await structure.load('phone')
    return response.status(201).json(structure)
  }

  public async show({ params, response }: HttpContextContract) {
    const structure = await Structure.query()
      .where('id', params.id)
      .preload('country')
      .preload('phone')
      .firstOrFail()
    return response.json(structure)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const structure = await Structure.findOrFail(params.id)
    const data = request.only(['name', 'photo', 'website', 'country_id', 'phone_id'])
    structure.merge(data)
    await structure.save()
    await structure.load('country')
    await structure.load('phone')
    return response.json(structure)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const structure = await Structure.findOrFail(params.id)
    await structure.delete()
    return response.status(204)
  }
}
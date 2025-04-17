import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/country'

export default class CountriesController {
  public async index({ response }: HttpContextContract) {
    const countries = await Country.query().preload('structures').preload('judges').preload('people')
    return response.json(countries)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name'])
    const country = await Country.create(data)
    return response.status(201).json(country)
  }

  public async show({ params, response }: HttpContextContract) {
    const country = await Country.query()
      .where('id', params.id)
      .preload('structures')
      .preload('judges')
      .preload('people')
      .firstOrFail()
    return response.json(country)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const country = await Country.findOrFail(params.id)
    const data = request.only(['name'])
    country.merge(data)
    await country.save()
    return response.json(country)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const country = await Country.findOrFail(params.id)
    await country.delete()
    return response.status(204)
  }
}
import type { HttpContext } from '@adonisjs/core/http'
import Country from '#models/country'

export default class CountriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Country.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['name'])
    return await Country.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Country.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    const data = request.only(['name'])
    country.merge(data)
    return await country.save()
  }
}

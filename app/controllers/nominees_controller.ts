import type { HttpContext } from '@adonisjs/core/http'
import Nominee from '#models/nominee'

export default class NomineesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Nominee.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['categoryId', 'nomableType', 'nomableId'])
    return await Nominee.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Nominee.query()
      // .preload('category') //todo; fixer cette erreur ! la meme que celui de packsController
      .where('id', params.id)
      .firstOrFail()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const nominee = await Nominee.findOrFail(params.id)
    const data = request.only(['categoryId', 'nomableType', 'nomableId'])

    nominee.merge(data)
    return await nominee.save()
  }
}

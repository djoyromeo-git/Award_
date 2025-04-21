import type { HttpContext } from '@adonisjs/core/http'
import Pack from '#models/pack'

export default class PacksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Pack.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['sessionId', 'voteCount', 'amount'])
    return await Pack.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Pack.query()
      // .preload('session') //todo; fix cette erreur
      .where('id', params.id)
      .firstOrFail()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const pack = await Pack.findOrFail(params.id)
    const data = request.only(['sessionId', 'voteCount', 'amount'])

    pack.merge(data)
    return await pack.save()
  }
}

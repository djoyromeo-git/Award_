import type { HttpContext } from '@adonisjs/core/http'
import Judge from '#models/judge'

export default class JudgesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await Judge.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['judiable', 'judiableId', 'sessionId', 'countryId'])
    return await Judge.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Judge.query()
      .preload('country')
      .preload('session')
      .where('id', params.id)
      .firstOrFail()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const judge = await Judge.findOrFail(params.id)
    const data = request.only(['judiable', 'judiableId', 'sessionId', 'countryId'])

    judge.merge(data)

    return await judge.save()
  }
}

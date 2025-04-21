import type { HttpContext } from '@adonisjs/core/http'
import Session from '#models/session'

export default class SessionController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Session.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['name', 'startDate', 'endDate', 'isCurrent'])

    if (data.isCurrent) {
      await Session.query().where('isCurrent', true).update({ isCurrent: false })
    }

    return await Session.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Session.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const session = await Session.findOrFail(params.id)
    const data = request.only(['name', 'startDate', 'endDate', 'isCurrent'])

    if (session.id !== params.id && data.isCurrent) {
      await Session.query().where('isCurrent', true).update({ isCurrent: false })
    }

    session.merge(data)
    await session.save()

    return session
  }
}

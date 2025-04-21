import type { HttpContext } from '@adonisjs/core/http'
import Structure from "#models/structure";
import Phone from "#models/phone";

export default class StructuresController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Structure.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['name', 'photo', 'website', 'countryId'])
    const phone = await Phone.firstOrNew({
      value: request.input('phone'),
    })

    return await Structure.create({
      ...data,
      phoneId: phone.id,
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Structure.query()
      .preload('country')
      .preload('phone')
      .where('id', params.id)
      .firstOrFail()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const structure = await Structure.findOrFail(params.id)
    const data = request.only(['name', 'photo', 'website', 'countryId'])
    const phone = await Phone.firstOrNew({
      value: request.input('phone'),
    })

    structure.merge({
      ...data,
      phoneId: phone.id,
    })

    return await structure.save()
  }
}

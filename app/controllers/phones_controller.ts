import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Phone from 'App/Models/phone'

export default class PhonesController {
  public async index({ response }: HttpContextContract) {
    const phones = await Phone.query().preload('structures').preload('people')
    return response.json(phones)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['value'])
    const phone = await Phone.create(data)
    return response.status(201).json(phone)
  }

  public async show({ params, response }: HttpContextContract) {
    const phone = await Phone.query()
      .where('id', params.id)
      .preload('structures')
      .preload('people')
      .firstOrFail()
    return response.json(phone)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    const data = request.only(['value'])
    phone.merge(data)
    await phone.save()
    return response.json(phone)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const phone = await Phone.findOrFail(params.id)
    await phone.delete()
    return response.status(204)
  }
}
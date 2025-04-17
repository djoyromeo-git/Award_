// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pack from 'App/Models/pack'

export default class PacksController {
  public async index({ response }: HttpContextContract) {
    const packs = await Pack.query()
      .preload('session')
      .preload('votes')
    return response.json(packs)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['session_id', 'vote_count', 'amount'])
    const pack = await Pack.create(data)
    await pack.load('session')
    await pack.load('votes')
    return response.status(201).json(pack)
  }

  public async show({ params, response }: HttpContextContract) {
    const pack = await Pack.query()
      .where('id', params.id)
      .preload('session')
      .preload('votes')
      .firstOrFail()
    return response.json(pack)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const pack = await Pack.findOrFail(params.id)
    const data = request.only(['session_id', 'vote_count', 'amount'])
    pack.merge(data)
    await pack.save()
    await pack.load('session')
    await pack.load('votes')
    return response.json(pack)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const pack = await Pack.findOrFail(params.id)
    await pack.delete()
    return response.status(204)
  }
}
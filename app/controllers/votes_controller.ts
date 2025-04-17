import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vote from 'App/Models/vote'

export default class VotesController {
  public async index({ response }: HttpContextContract) {
    const votes = await Vote.query()
      .preload('nominee')
      .preload('pack')
    return response.json(votes)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nominee_id', 'pack_id', 'fullname', 'email', 'phone'])
    const vote = await Vote.create(data)
    await vote.load('nominee')
    await vote.load('pack')
    return response.status(201).json(vote)
  }

  public async show({ params, response }: HttpContextContract) {
    const vote = await Vote.query()
      .where('id', params.id)
      .preload('nominee')
      .preload('pack')
      .firstOrFail()
    return response.json(vote)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const vote = await Vote.findOrFail(params.id)
    const data = request.only(['nominee_id', 'pack_id', 'fullname', 'email', 'phone'])
    vote.merge(data)
    await vote.save()
    await vote.load('nominee')
    await vote.load('pack')
    return response.json(vote)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const vote = await Vote.findOrFail(params.id)
    await vote.delete()
    return response.status(204)
  }
}
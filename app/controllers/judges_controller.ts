// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Judge from 'App/Models/judge'

export default class JudgesController {
  public async index({ response }: HttpContextContract) {
    const judges = await Judge.query()
      .preload('country')
      .preload('session')
    return response.json(judges)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['judiable', 'country_id', 'session_id'])
    const judge = await Judge.create(data)
    await judge.load('country')
    await judge.load('session')
    return response.status(201).json(judge)
  }

  public async show({ params, response }: HttpContextContract) {
    const judge = await Judge.query()
      .where('id', params.id)
      .preload('country')
      .preload('session')
      .firstOrFail()
    return response.json(judge)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const judge = await Judge.findOrFail(params.id)
    const data = request.only(['judiable', 'country_id', 'session_id'])
    judge.merge(data)
    await judge.save()
    await judge.load('country')
    await judge.load('session')
    return response.json(judge)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const judge = await Judge.findOrFail(params.id)
    await judge.delete()
    return response.status(204)
  }
}
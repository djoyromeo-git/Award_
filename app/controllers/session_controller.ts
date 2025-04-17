// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Session from 'App/Models/session'

export default class SessionController {
  public async index({ response }: HttpContextContract) {
    const sessions = await Session.query()
      .preload('categories')
      .preload('judges')
      .preload('packs')
    return response.json(sessions)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'description', 'date_start', 'date_end', 'is_current'])
    const session = await Session.create(data)
    await session.load('categories')
    await session.load('judges')
    await session.load('packs')
    return response.status(201).json(session)
  }

  public async show({ params, response }: HttpContextContract) {
    const session = await Session.query()
      .where('id', params.id)
      .preload('categories')
      .preload('judges')
      .preload('packs')
      .firstOrFail()
    return response.json(session)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const session = await Session.findOrFail(params.id)
    const data = request.only(['name', 'description', 'date_start', 'date_end', 'is_current'])
    session.merge(data)
    await session.save()
    await session.load('categories')
    await session.load('judges')
    await session.load('packs')
    return response.json(session)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const session = await Session.findOrFail(params.id)
    await session.delete()
    return response.status(204)
  }
}
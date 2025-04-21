import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Category.query().preload('session')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.only(['name', 'shortDescription', 'fullDescription', 'sessionId'])
    return Category.create(data)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.load('session')
    return category
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const data = request.only(['name', 'shortDescription', 'fullDescription', 'sessionId'])
    category.merge(data)
    return await category.save()
  }
}

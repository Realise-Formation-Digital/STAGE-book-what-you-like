import CategoryDao from "../daos/categoryDao";

/**
 * @class
 * @classdesc Class that describe the model of Category
 * @author Lionel Schuster
 */
class CategoriesModel {

  /**
   * Insert Category model
   * @param title {string} - title of the category
   * @param description {string} - date of insertion
   * @param ts {number} - ts of action
   * @returns {Promise<void>}
   */
  static async insertCategory (title, description, ts) {
    try {
      console.log('[Model][Categories][insertCategory] Inserting category with params', title, description, ts)
      let result = null
      result = await CategoryDao.insertCategory(title, description, ts)
      return result
    }catch (e) {
      console.error('[Model][Categories][insertCategory] An error occurred when inserting category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /**
   * Delete a single category
   * @param {string} id - id to delete a single category
   * @returns *
   */
  static async removeCategory (id) {
    try {
      console.log('[Model][Categories][removeCategory] remove category with params', id)
      let result = null
      result = await CategoryDao.removeCategory(id)
      return result
    }catch (e) {
      console.error('[Model][Categories][removeCategory] An error occurred when removing category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /**
   * Update a single category by id
   * @param {string} id - id to search the category to update
   * @param {string} title - title if we want to update
   * @param {string} description - description to update
   * @returns {Promise<*>}
   */
  static async updateCategory (id, title, description) {
    try {
      console.log('[Model][Categories][updateCategory] updating category with params', id)
      let result = null
      result = await CategoryDao.updateCategory(title, description)
      return result
    }catch (e) {
      console.error('[CategoriesModel][updateCategory] An error occurred when updating category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default CategoriesModel
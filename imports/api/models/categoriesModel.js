import CategoryDao from "../daos/categoryDao";

/**
 * @class
 * @classdesc Class that describe the model of Category
 * @author Lionel Schuster
 */
class CategoriesModel {

  /**
   * Insert Category model
   * @param name {string} - title of the category
   * @param description {string} - date of insertion
   * @param ts {number} - ts of action
   * @returns {Promise<void>}
   */
  static async insertCategory (name, description, ts) {
    try {
      console.log('[Model][Categories][insertCategory] Inserting category with params', name, description, ts)
      let result = null
      result = await CategoryDao.insertCategory(name, description, ts)
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
      console.log('[Model][Categories][removeCategory] Removing category with params', id)
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
   * @param {object} objectToUpdate - object that contains all the cahnges
   * @returns {Promise<*>}
   */
  static async updateCategory (id,objectToUpdate) {
    try {
      console.log('[Model][Categories][updateCategory] updating category with params', id)
      let result = null
      result = await CategoryDao.updateCategory(id, objectToUpdate)
      return result
    }catch (e) {
      console.error('[Model][Categories][updateCategory] An error occurred when updating category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default CategoriesModel

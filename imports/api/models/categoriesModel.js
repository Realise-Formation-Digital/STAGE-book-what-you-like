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
   * @param date {Date} - date of insertion
   * @returns {Promise<void>}
   */
  static async insertCategory (title, date) {
    try {
      let result = null

      result = await CategoryDao.insertCategory(title, date)

      return result
    }catch (e) {
      console.error('[CategoriesModel][insertCategory] An error occurred when inserting category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /**
   * 
   * @param {string} _id 
   * @returns 
   */
  static async removeCategory (_id) {
    try {
      let result = null

      result = await CategoryDao.removeCategory(_id)

      return result
    }catch (e) {
      console.error('[CategoriesModel][removeCategory] An error occurred when removing category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
  static async updateCategory (title, date) {
    try {
      let result = null

      result = await CategoryDao.updateCategory(title, date)

      return result
    }catch (e) {
      console.error('[CategoriesModel][updateCategory] An error occurred when updating category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default CategoriesModel
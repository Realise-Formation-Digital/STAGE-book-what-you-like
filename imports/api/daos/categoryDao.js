import CategoriesCollection from "../collections/categoriesCollection";

class CategoryDao {

  /**
   * Insert Category
   * @param title {string} - title of the link
   * @param date {Date} - date of insertion
   * @returns {Promise<any>}
   */
  static async insertCategory(title, date) {
    console.log('[CategoryDao][insertCategory] Inserting category with params', title, date)
    try {
      return CategoriesCollection.insert({
        title: title,
        date: date
      })
    } catch (e) {
      console.error('[CategoryDao][insertCategory] An error occurred when inserting category in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting category', e.detail)
    }
  }

  /**
   * delete Category
   * @param {string} _id 
   * @returns 
   */
  static async removeCategory(_id) {
    console.log('[CategoryDao][removeCategory] Removing category with params', _id)
    try {
      return CategoriesCollection.remove({
        ' _id': _id
      })
    } catch (e) {
      console.error('[CategoryDao][removeCategory] An error occurred when deleting category in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when deleting category', e.detail)
    }
  }

  /* Modify category */
  static async updateCategory(title, date) {
    console.log('[CategoryDao][updateCategory] Updating category with params', title, date)
    try {
      return CategoriesCollection.update({
        title: title,
        date: date
      })
    } catch (e) {
      console.error('[CategoryDao][updateCategory] An error occurred when updating category in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when updating category', e.detail)
    }
  }


}

export default CategoryDao
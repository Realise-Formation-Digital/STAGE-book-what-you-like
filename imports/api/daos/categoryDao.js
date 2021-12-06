import CategoriesCollection from "../collections/categoriesCollection";

class CategoryDao {

  /**
   * Insert Category
   * @param title {string} - title of the link
   * @param description {string} - date of insertion
   * @param ts {number} - date of insertion
   * @returns {Promise<any>}
   */
  static async insertCategory(title, description,  ts) {
    console.log('[DAO][Category][insertCategory] Inserting category with params', title, description, ts)
    try {
      return CategoriesCollection.insert({
        title : title,
        description: description,
        ts: ts
      })
    } catch (e) {
      console.error('[DAO][Category][insertCategory] An error occurred when inserting category in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting category', e.detail)
    }
  }

  /**
   * delete Category
   * @param {string} id - id to remove
   * @returns {Promise<any>}
   */
  static async removeCategory(id) {
    console.log('[DAO][Category][removeCategory] Removing category with params', id)
    try {
      return CategoriesCollection.remove({
        '_id': id
      })
    } catch (e) {
      console.error('[DAO][Category][removeCategory] An error occurred when deleting category in database', e)
      throw new Meteor.Error('0002', 'An error occurred in dao when deleting category', e.detail)
    }
  }

  /**
   * Update a single category
   * @param {string} id - id to update
   * @param {object} objectToUpdate - object to update
   * @returns {Promise<any>}
   */
  static async updateCategory(id, objectToUpdate) {
    console.log('[DAO][Category][updateCategory] Updating category with params', id, objectToUpdate)
    try {
      const {title, description } = objectToUpdate
      return CategoriesCollection.update ({_id: id}, {
        title: title,
        description: description,
      })
    }  catch (e) {
      console.error('[DAO][Category][updateCategory] An error occurred when updating category in database', e)
      throw new Meteor.Error('0003', 'An error occurred in dao when updating category', e.detail)
    }
  }


}

export default CategoryDao

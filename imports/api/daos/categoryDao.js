import CategoriesCollection from "../collections/categoriesCollection";

class CategoryDao {

  /**
   * Insert Category
   * @param title {string} - title of the link
   * @param date {Date} - date of insertion
   * @returns {Promise<any>}
   */
  static async insertCategory(title, date){
    console.log('[CategoryDao][insertCategory] Inserting category with params', title, date)
    try {
      return LinksCollection.insert({
        title: title,
        date: date
      })
    }catch (e) {
      console.error('[CategoryDao][insertCategory] An error occurred when inserting category in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting category', e.detail)
    }
  }
}

export default CategoryDao
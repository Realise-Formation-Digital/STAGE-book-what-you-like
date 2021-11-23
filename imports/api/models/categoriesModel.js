import CategoryDao from "../daos/categoryDao";
/**
 * @class
 * @classdesc Class that describe the model of category
 * @author Lionel Schuster
 */
 class CategoriesModel {
     /**
      * insert category Model
      * @param title {string} - name of the category
      * @param date {date} - date of the creation of the category
      * @returns {Promise<void>}
      */
     static async insertCategory (title, date) {
         try {
             let result = null

             result = CategoryDao.insertCategory(title, date)

             return result

         }catch (e) {
             console.error('[CategoriesModel][insertCategory] An error occured when inserting category', e)
             throw new Meteor.error(e.error, e.reason, e.details)

         }
     }
 }

 export default CategoriesModel
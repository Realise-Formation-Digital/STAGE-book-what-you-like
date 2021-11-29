import {meteorCall} from "../libs/meteorCalls";
import {meteorMethods} from "../libs/defaultValues";

class CategoryService {

  static async insertCategory(name, desc) {
    try {
      console.log('[Services][Category][insertCategory] Inserting category with params', name, desc)
      return meteorCall(meteorMethods.category.insert, name, desc)
    } catch (e) {
      console.error('[Services][Category][insertCategory] An error occurred when insert category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  static async deleteCategory(id) {
    try {
      console.log('[Services][Category][deleteCategory] Deleting category with params', id)
      return meteorCall(meteorMethods.category.delete, id)
    } catch (e) {
      console.error('[Services][Category][deleteCategory] An error occurred when deleteSelectedItem', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  static async updateCategory(id, objectToUpdate) {
    try {
      console.log('[Services][updateCategory] Updating category with params', id, objectToUpdate)
      return meteorCall()
    } catch (e) {
      console.error('[Services][CategoryService][deleteSelectedItem] An error occurred when deleteSelectedItem', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }


}

export default CategoryService

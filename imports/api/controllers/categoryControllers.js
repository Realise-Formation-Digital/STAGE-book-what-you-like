import {Meteor} from 'meteor/meteor';
import CategoriesModel from "../models/categoriesModel";
import Date from "../libs/Date.js";
import { check } from 'meteor/check';
 

Meteor.methods({

  /**Insert a single Category
   * @param {string} name - category's name
   * @param {string} description - category's description
   * @returns {Promise<void>}
   */
  async insertCategory(name, description) {
    try {
      console.log('[Controller][Categories][insertCategory] Inserting category with params', name, description)
      
      check(name, String) //id verification to insert a category
      check(description, String) // description verification to insert category

      let result = null
      let ts = Date.getTs();
      result = CategoriesModel.insertCategory(name, description, ts)
      return result
    } catch (e) {
      console.error('[Controller][Categories][insertCategory] An error occurred when insert category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  /**Delete a single Category
   * @param {string} id - id to remove
   * @returns *
   */
  async removeCategory(id) {
    try {
      console.log('[Controller][Categories][removeCategories] Removing category with params', id)
      check(id, String) // id verification to remove a category
      let result = null
      result = CategoriesModel.removeCategory(id)
      return result
    } catch (e) {
      console.error('Controller][Categories][removeCategories] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  /**Update a single category
   * @param {string} id - id to update
   * @param {object} objectToUpdate - object that contains all the changes
   * @returns {Promise<*|undefined>}
   */
  async updateCategory(id, objectToUpdate) {
    try {
      console.log('[Controller][Categories][updateCategory] Updating category with params', id, objectToUpdate)
      check(id, String) // id verification to update a category
      check(objectToUpdate, Object) // object verification
      let result = null
      result = CategoriesModel.updateCategory(id, objectToUpdate)
      return result
    } catch (e) {
      console.error('[Controller][Categories[updateCategory] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

});

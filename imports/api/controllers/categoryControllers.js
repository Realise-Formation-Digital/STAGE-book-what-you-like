import {Meteor} from 'meteor/meteor';
import CategoriesModel from "../models/categoriesModel";

Meteor.methods({

  /**
   * Insert a single Category
   * @param {string} name - category's name
   * @param {string} description - category's description
   * @returns {Promise<void>}
   */
  async insertCategory(name, description) {
    try {
      console.log('[Controller][Categories][insertCategory] Inserting category with params', name, description)
      let result = null
      let ts = new Date().getTime()
      result = CategoriesModel.insertCategory(name, description, ts)
      return result
    } catch (e) {
      console.error('[Controller][Categories][insertCategory] An error occurred when insert category', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  /**
   * Delete a single Category
   * @param {string} id - id to remove
   * @returns *
   */
  async removeCategory(id) {
    try {
      console.log('[Controller][Categories][removeCategories] Inserting category with params', id)
      let result = null
      result = CategoriesModel.removeCategory(id)
      return result
    } catch (e) {
      console.error('Controller][Categories][removeCategories] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  /**
   * Update a single category
   * @param {string} id - id to update
   * @param {string} name - name to update
   * @param {string} description - description to update
   * @returns {Promise<*|undefined>}
   */
  async updateCategory(id, name, description) {
    try {
      console.log('[Controller][Categories][updateCategory] Updating category with params', id, name, description)
      let result = null
      result = CategoriesModel.updateCategory(id, name, description)
      return result
    } catch (e) {
      console.error('[CategoriesController][updateCategory] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

});
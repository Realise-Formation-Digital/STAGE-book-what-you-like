import { Meteor } from 'meteor/meteor';

import CategoriesModel from "../models/categoriesModel";

Meteor.methods({
    //create method for create Category
    async insertCategory(name, description, timestamp) {
        try {

            let result = null

            console.log(name, description, timestamp)

            result = CategoriesModel.insertCategory(name, description , timestamp)

            return result

        } catch (e) {
            console.error('[CategoriesController][insertCategory] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },

    /** method to delete category
     * 
     * @param {string} _id 
     * @returns 
     */
    async removeCategory(_id) {
        try {
            let result = null

            console.log(_id)

            
            result = CategoriesModel.removeCategory(_id)

            return result
        } catch (e) {
            console.error('[CategoriesController][removeCategories] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },
    // create method to modify category
    async updateCategory(name, description, timestamp) {
        try {
            let result = null

            console.log(name, description, timestamp)

            result = CategoriesModel.updateCategory(name, description ,timestamp)

            return result
        } catch (e) {
            console.error('[CategoriesController][updateCategory] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

});

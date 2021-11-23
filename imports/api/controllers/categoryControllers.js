import { Meteor } from 'meteor/meteor';

import CategoriesModel from "../models/categoriesModel";

Meteor.methods({
    //create method for create categories
    async insertCategory(title) {
        try {

            let result = null

            console.log(title)

            //result = CategoriesModel.insertCategory(name)

            return result

        } catch (e) {
            console.error('[CategoriesController][insertCategory] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },
    //create method to delete Category

    /**
     * 
     * @param {string} _id 
     * @returns 
     */
    async removeCategory(_id) {
        try {
            let result = null

            console.log(_id)

            result = CategoriesModel.removeCategories(_id)

            return result
        } catch (e) {
            console.error('[CategoriesController][removeCategory] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },
    // create method to modify thing
    async updateCategory(_id, name) {
        try {
            let result = null

            console.log(_id, name)

            result = CategoriesModel.updateCategory(name)

            return result
        } catch (e) {
            console.error('[CategoriesController][updateCategory] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

});

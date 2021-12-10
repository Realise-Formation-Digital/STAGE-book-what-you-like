import { Meteor } from 'meteor/meteor';
import UserModel from "../models/usersModel";
import Date from "../libs/Date.js";
import { check } from 'meteor/check';

Meteor.methods({

    /**Create a simple user account
     * @param {string} password
     * @param {string} email
    */
    async insertUser(email, password) {
        try {
            console.log('[Controller][Categories][insertCategory] Inserting category with params', name, description)
            check(email, String) //email verification
            check(password, String)//password verification


            let result = null
            let ts = Date.getTs();
            result = UsersModel.insertUser(email, password, ts)
            return result
        } catch (e) {
            console.error('[Controller][Users][insertUser] An error occurred when insert category', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },

    /**
   * Removing a single user
   * @param {string} id
   * @returns
   */
    async removeUser(id) {
        try {
            console.log('[Controller][Users][removeUser] Removing user with params', id)
            check(id, String)// id verification to remove user
            let result = null
            result = UsersModel.removeUser(id)
            return result
        } catch (e) {
            console.error('[Controller][Users][removeUser] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },


    /**update a single user
     * @param {string} id - id to update
     * @param {object} objectToUpdate - object that contains all the changes
     * @returns {promise<*>}
     */
    async updateUser(id, objectToUpdate) {
        try {
            console.log('[Controller][Users][updateUser] Updating user with params', id, objectToUpdate)
            check(id, String)// id verification to update user
            check(objectToUpdate, Object)// object verification 
            let result = null
            result = UserModel.updateUser(id, objectToUpdate)
            return result
        } catch (e) {
            console.error('[Controller][Users][updateUser] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

});

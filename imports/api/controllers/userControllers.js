import { Meteor } from 'meteor/meteor';
import UserModel from "../models/userModel";

Meteor.methods({


    /**Create a single user
     *
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @param {string} role
      * @param {number} tsFrom - ts form of reservation
     * @param {number} tsTo - ts to of reserve
     * @returns {Promise<*>}
     */
    async insertUser(firstname, lastname, email, role, tsFrom, tsTo) {
        try {
            console.log('[Controller][User][insertUser] Inserting reservation with params', firstname, lastname, email, role, tsFrom, tsTo)
            let result = null
            const ts = new Date().getTime()
            result = UserModel.insertUser(firstname, lastname, email, role, tsFrom, tsTo)
            return result
        } catch (e) {
            console.error('[Controller][User][insertUser] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },

    /**
     * Removing a single user
     * @param {string} _id
     * @returns
     */
    async removeUser(id) {
        try {
            console.log('[Controller][User][removeUser] Removing thing with params', id)
            let result = null
            result = ThingUser.removeUser(_id)
            return result
        } catch (e) {
            console.error('[Controller][User][removeUser] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },


    // update a single user
    /**
     * 
     * @param {string} id - id to update
     * @param {object} objectToUpdate - object that contains all the changes
     * @returns {promise<*>}
     */
    async updateUser(id, objectToUpdate) {
        try {
            console.log('[Controller][User][updateUser] Updating thing with params', id, objectToUpdate)
            let result = null
            result = UserModel.updateUser(id, objectToUpdate)
            return result
        } catch (e) {
            console.error('[Controller][User][updateZser] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

});

import UserDao from "../daos/userDao";

/**
 * @class
 * @classdesc Class that describe the model of Thing
 * @author Schuster Lionel
 */
class UserModel {
    //todo comment

    /**
     * @param firstName {string} - title of the user
     * @param lastName  {string} - description  of the user
     * @param email {string} -  the user email
     * @param role 
     * @param {number} tsFrom - ts form of reservation
     * @param {number} tsTo - ts to of reserve
     * @returns {Promise<*>}
     */
    static async insertUser(firstname, lastname, email, role, tsFrom, tsTo) {
        try {
            console.log('[Model][User][insertUser] Inserting reservation with params', firstname, lastname, email, role, tsFrom, tsTo)
            let result = null
            result = UserDao.insertUser(firstname, lastname, email, role, tsFrom, tsTo)
            return result
        } catch (e) {
            console.error('[Model][User][insertUser] An error occurred when inserting thing', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

    /**
     * Remove single thing
     * @param {string} id
     * @returns
     */
    static async removeUser(id) {
        try {
            console.log('[Model][User][removeUser] Removing thing with params', id)
            let result = null
            result = await UserDao.removeUser(id)
            return result
        } catch (e) {
            console.error('[Model][User][removeUser] An error occurred when removing thing', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

    /**
     * Object
     * @param {string} id - id to update
     * @param {object} objectToUpdate - object that contains all the changes
     * @return {Promise<*>}
     */
    static async updateUser(id, objectToUpdate) {
        try {
            console.log('[Model][User][updateUser] Removing thing with params', id, objectToUpdate)
            let result = null
            result = await UserDao.updateUser(id, objectToUpdate)
            return result
        } catch (e) {
            console.error('[Model][User][updateUser] An error occurred when update thing', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

}

export default UserModel

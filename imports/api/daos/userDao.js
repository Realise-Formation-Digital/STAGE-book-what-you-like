import UserCollection from "../collections/userCollection";

class UserDao {


    /**
     * Insert a single user
     * @param {string} firstName - firstname user
     * @param {string} lastName - lastname user
     * @param {string} email  - email of the user
     * @param {string} role - role of the user
     * @param {number} tsFrom - ts form of reservation
     * @param {number} tsTo - ts to of reserve
     * @returns {Promise<*>}
     */
    static async insertUser(firstname, lastname, email, role, tsFrom, tsTo) {
        console.log('[DAO][UserDao][updateUser] Inserting thing with params', firstname, lastname, email, role, tsFrom, tsTo)
        try {
            return UserCollection.insert({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                tsFrom: tsFrom,
                tsTo: tsTo,
                

            })
        } catch (e) {
            console.error('[DAO][User][insertUser] An error occurred when inserting user in database', e)
            throw new Meteor.Error('0007', 'An error occurred in dao when inserting user', e.detail)
        }
    }

    /**
     * Delete single user
     * @param {string} id - id to remove
     * @returns {Promise<*>}
     */
    static async removeUser(id) {
        console.log('[DAO][User][removeUser] removing user with params', id)
        try {
            return UserCollection.remove({
                '_id': id
            })
        } catch (e) {
            console.error('[DAO][User][removeUser] An error occurred when removing user in database', e)
            throw new Meteor.Error('0008', 'An error occurred in dao when removing user', e.detail)
        }
    }

    /**
     * Update a single user
     * @param {string} id- id to update
     * @param {object} objectToUpdate - object to update
     * @return {Promise<any>}
     */
    static async updateUser(id, objectToUpdate) {
        console.log('[DAO][User][updateUser] Updating user with params', id, objectToUpdate)
        try {
            const { firstname, lastname, email, role, tsFrom, tsTo} = objectToUpdate
            return UserCollection.update({ _id: id }, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                tsFrom: tsFrom,
                tsTo: tsTo,

            })
        } catch (e) {
            console.error('[DAO][User][updateUser] An error occurred when updating user in database', e)
            throw new Meteor.Error('0009', 'An error occurred in dao when updating user', e.detail)
        }
    }
}

export default UserDao

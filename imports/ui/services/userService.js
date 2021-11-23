import { meteorCall } from "../libs/meteorCalls";
import { meteorMethods } from "../libs/defaultValues";

class UserService {

    static async insertUser(title, url) {
        try {
            return meteorCall(meteorMethods.insertUser, title, url)
        } catch (e) {
            console.error('[Service][Things][insertUser] An error occurred when insert link', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }
    static async deleteUser(title, url) {
        try {
            return meteorCall(meteorMethods.deleteUser, title, url)
        } catch (e) {
            console.error('[Service][Things][deleteUser] An error occurred when insert link', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }
    static async updateUser(title, url) {
        try {
            return meteorCall(meteorMethods.updateUser, title, url)
        } catch (e) {
            console.error('[Service][Things][updateUser] An error occurred when insert link', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }


}

export default UserService
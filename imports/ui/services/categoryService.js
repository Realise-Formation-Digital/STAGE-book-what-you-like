import { meteorCall } from "../libs/meteorCalls";
import { meteorMethods } from "../libs/defaultValues";

class CategoryService {

    static async insertCategory(name, descs) {
        try {
            return meteorCall()
        } catch (e) {
            console.error('[Services][CategoryService][insertCategory] An error occurred when insert category', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    } 
    static async deleteSelectedItem(id) {
        try {
            return meteorCall()
        } catch (e) {
            console.error('[Services][CategoryService][deleteSelectedItem] An error occurred when insert category', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }
    
    static async insertSaveCategory(id) {
        try {
            return meteorCall()
        } catch (e) {
            console.error('[Services][categoryService][insertSaveCategory] An error occurred when insert category', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }


}

export default CategoryService
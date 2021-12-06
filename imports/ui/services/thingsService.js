import { meteorCall } from "../libs/meteorCalls";
import { meteorMethods } from "../libs/defaultValues";

class ThingsService {

  static async insertThings(name, description, serialNumber, categoryId) {
    console.log('[Service][Things][insertThings]')
    try {
      return meteorCall(meteorMethods.thing.insert, name, description, false, serialNumber, null, false, false, categoryId)
    } catch (e) {
      console.error('[Service][Things][insertThings] An error occurred when insert link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
  static async deleteThings(id) {
    console.log('[Service][Things][deleteThings] Deleting things with params', id)
    try {
      return meteorCall(meteorMethods.thing.delete, id)
    } catch (e) {
      console.error('[Service][Things][deleteThings] An error occurred when insert link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
  static async updateThings(id, form) {
    console.log('[Service][Things][updateThings] Update things with params', id, form)
    try {
      return meteorCall(meteorMethods.updateThings, id, form)
    } catch (e) {
      console.error('[Service][Things][updateThings] An error occurred when insert link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

}






export default ThingsService

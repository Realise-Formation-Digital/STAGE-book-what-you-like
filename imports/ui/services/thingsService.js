import { meteorCall } from "../libs/meteorCalls";
import { meteorMethods } from "../libs/defaultValues";

class ThingsService {

  static async insertThings(name, description, serialNumber, categoryId) {
    console.log('[Service][Things][insertThings]')
    try {
      return meteorCall(meteorMethods.insertThings, name, description, serialNumber, categoryId)
    } catch (e) {
      console.error('[Service][Things][insertThings] An error occurred when insert link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
  static async deleteThings(id) {
    try {
      return meteorCall(meteorMethods.deleteThings, id)
    } catch (e) {
      console.error('[Service][Things][deleteThings] An error occurred when insert link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
  static async updateThings(title, url) {
    try {
      return meteorCall(meteorMethods.updateThings, title, url)
    } catch (e) {
      console.error('[Service][Things][updateThings] An error occurred when insert link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

}






export default ThingsService
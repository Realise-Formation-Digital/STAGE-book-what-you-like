import ThingDao from "../daos/thingDao";
import Mail from "../libs/Mail";

/**
 * @class
 * @classdesc Class that describe the model of Thing
 * @author Schuster Lionel
 */
class ThingsModel {
  //todo comment

  /**
   * @param {string} title of the thing
   * @param {string}description  - description  of the thing
   * @param {Boolean}reserved  - if the thing is reserved or not
   * @param {string} serialNumber - serial number of object
   * @param {boolean}parkingType  - if location is
   * @param {Boolean}hasCable  - if the thing need a cable
   * @param {Boolean}hasWhiteBoard  - if needed a whiteboard
   * @param {number}ts  - ts of insertion
   * @returns {Promise<*>}
   */
  static async insertThing(name, description, reserved, serialNumber, parkingType, hasCable, hasWhiteBoard, ts, categoryId) {
    try {
      console.log('[Model][Things][insertThing] Inserting reservation with params', name, description, reserved, serialNumber, parkingType, hasCable, hasWhiteBoard, ts, categoryId)
      let result = null
      result = ThingDao.insertThing(name, description, reserved, serialNumber, parkingType, hasCable, hasWhiteBoard, ts, categoryId)
      return result
    } catch (e) {
      console.error('[Model][Things][insertThing] An error occurred when inserting thing', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /**
   * Remove single thing
   * @param {string} id
   * @returns
   */
  static async removeThing(id) {
    try {
      console.log('[Model][Things][removeThing] Removing thing with params', id)
      let result = null
      result = await ThingDao.removeThing(id)
      Mail.sendEmail('Your thing is removed')
      return result
    } catch (e) {
      console.error('[Model][Things][removeThing] An error occurred when removing thing', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /**
   * Object
   * @param {string} id - id to update
   * @param {object} objectToUpdate - object that contains all the changes
   * @return {Promise<*>}
   */
  static async updateThing(id, objectToUpdate) {
    try {
      console.log('[Model][Things][updateThing] Removing thing with params', id, objectToUpdate)
      let result = null
      result = await ThingDao.updateThing(id, objectToUpdate)
      Mail.sendEmail('Your thing is updated')
      return result
    } catch (e) {
      console.error('[Model][Things][updateThing] An error occurred when update thing', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

}

export default ThingsModel

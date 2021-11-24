import ThingDao from "../daos/thingDao";

/**
 * @class
 * @classdesc Class that describe the model of Thing
 * @author Schuster Lionel
 */
class ThingsModel {
  //todo comment

  /**
   * @param name {string} - title of the thing
   * @param description {string} - description  of the thing
   * @param reserved {Boolean} - if the thing is reserved or not
   * @param serialNumber
   * @param parkingType {string} - if location is
   * @param hasCable {Boolean} - if the thing need a cable
   * @param hasWhiteBoard {Boolean} - if needed a whiteboard
   * @param ts
   * @returns {Promise<*>}
   */
  static async insertThing(name, description, reserved, serialNumber, parkingType, hasCable, hasWhiteBoard, ts) {
    try {
      console.log('[Model][Things][insertThing] Inserting reservation with params', ame, description, reserved, serialNumber, parkingType, hasCable, hasWhiteBoard, ts)
      let result = null
      result = ThingDao.insertThing(name, description, reserved, serialNumber, parkingType, hasCable, hasWhiteBoard, ts)
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
      return result
    } catch (e) {
      console.error('[Model][Things][removeThing] An error occurred when removing thing', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /**update the thing */
  static async updateThing(name, description, reserved, serialNumber, parkingType = null, hasCable, hasWhiteBoard, timestamp) {
    try {
      let result = null
      result = await ThingDao.insertThing(name, description, reserved, serialNumber, parkingType = null, hasCable, hasWhiteBoard, timestamp) // todo pour update on va inserir? XD
      return result
    } catch (e) {
      console.error('[ThingsModel][updateThing] An error occurred when update thing', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

}

export default ThingsModel
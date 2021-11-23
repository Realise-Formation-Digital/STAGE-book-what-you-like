import ThingDao from "../daos/thingDao";

/**
 * @class
 * @classdesc Class that describe the model of Thing
 * @author Marco Tribuzio
 */
class ThingsModel {

  /**
   * Insert Thing model
   * @param name {string} - title of the thing
   * @param description {string} - description  of the thing
   * @param reserved {Boolean} - if the thing is reserved or not
   * @param serial_number {string} - serial number of the thing
   * @param categoryId {string} - categoryId of the thing
   * @param parking_type {string} - if location is 
   * @param hasCable {Boolean} - if the thing need a cable
   * @param hasWhiteBoard {Boolean} - if needed a whiteboard
   * @param timestamp {number} - to calculate the time
   * @returns {Promise<void>}
   */
  static async insertThing (name, description , reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp) {
    try {
      let result = null

      result = ThingDao.insertThing(name, description , reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)

      return result
    }catch (e) {
      console.error('[ThingsModel][insertThing] An error occurred when inserting thing', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default ThingsModel
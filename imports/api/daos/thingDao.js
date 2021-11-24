import ThingsCollection from "../collections/thingsCollection";

class ThingDao {

  /**
   * Insert Link
   * @param name {string} - title of the thing
   * @param description {string} - description  of the thing
   * @param imgId {string} - image of the thing
   * @param reserved {Boolean} - if the thing is reserved or not
   * @param serial_number {string} - serial number of the thing
   * @param categoryId {string} - categoryId of the thing
   * @param parkingType {string} - if location is 
   * @param hasCable {Boolean} - if the thing need a cable
   * @param hasWhiteBoard {Boolean} - if needed a whiteboard
   * @param timestamp {number} - to calculate the time
   * @returns {Promise<any>}
   */
  static async insertThing(name, description, imgId, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp) {
    console.log('[ThingDao][insertThing] Inserting thing with params', name, description, imgId, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)
    try {
      return ThingsCollection.insert({
        name: name,
        description: description,
        imgId: imgId,
        reserved: reserved,
        serial_number: serial_number,
        categoryId: categoryId,
        parkingType: parkingType,
        hasCable: hasCable,
        hasWhiteBoard: hasWhiteBoard,
        timestamp: timestamp,

      })
    } catch (e) {
      console.error('[ThingDao][insertThing] An error occurred when inserting thing in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting thing', e.detail)
    }
  }

  /** delete thing
   * @param {string} _id
   * @returns
   */
  static async removeThing(_id) {
    console.log('[ThingDao][removeThing] removing thing with params', _id)
    try {
      return ThingsCollection.remove({
        '_id': _id
      })
    } catch (e) {
      console.error('[ThingDao][removeThing] An error occurred when removing thing in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when removing thing', e.detail)
    }
  }
  static async updateThing(name, description, imgId, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp) {
    console.log('[ThingDao][updateThing] Updating thing with params', name, description, imgId, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)
    try {
      return ThingsCollection.update({
        name: name,
        description: description,
        imgId: imgId,
        reserved: reserved,
        serial_number: serial_number,
        categoryId: categoryId,
        parkingType: parkingType,
        hasCable: hasCable,
        hasWhiteBoard: hasWhiteBoard,
        timestamp: timestamp,
      })
    } catch (e) {
      console.error('[ThingDao][updateThing] An error occurred when updating thing in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when updating thing', e.detail)
    }
  }
}

export default ThingDao
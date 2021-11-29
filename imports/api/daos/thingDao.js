import ThingsCollection from "../collections/thingsCollection";

class ThingDao {

  //todo comment

  /**
   * Insert Link
   * @param name {string} - title of the thing
   * @param description {string} - description  of the thing
   * @param imgId {string} - image of the thing
   * @param reserved {Boolean} - if the thing is reserved or not
   * @param serial_number {string} - serial number of the thing
   * @param parkingType {string} - if location is
   * @param hasCable {Boolean} - if the thing need a cable
   * @param hasWhiteBoard {Boolean} - if needed a whiteboard
   * @param ts
   * @returns {Promise<*>}
   */
  static async insertThing(name, description, imgId, reserved, serial_number, parkingType, hasCable, hasWhiteBoard, ts) {
    console.log('[DAO][ThingDao][insertThing] Inserting thing with params', name, description, imgId, reserved, serial_number, parkingType, hasCable, hasWhiteBoard, ts)
    try {
      return ThingsCollection.insert({
        name: name,
        description: description,
        imgId: imgId,
        reserved: reserved,
        serial_number: serial_number,
        categoryId: categoryId, //todo il s'est perdu? :)
        parkingType: parkingType,
        hasCable: hasCable,
        hasWhiteBoard: hasWhiteBoard,
        timestamp: ts,

      })
    } catch (e) {
      console.error('[DAO][Thing][insertThing] An error occurred when inserting thing in database', e)
      throw new Meteor.Error('0007', 'An error occurred in dao when inserting thing', e.detail)
    }
  }

  /**
   * Delete single thing
   * @param {string} id - id to remove
   * @returns {Promise<*>}
   */
  static async removeThing(id) {
    console.log('[DAO][Thing][removeThing] removing thing with params', id)
    try {
      return ThingsCollection.remove({
        '_id': id
      })
    } catch (e) {
      console.error('[DAO][Thing][removeThing] An error occurred when removing thing in database', e)
      throw new Meteor.Error('0008', 'An error occurred in dao when removing thing', e.detail)
    }
  }

  /**
   * Update a single thing
   * @param {string} id- id to update
   * @param {object} objectToUpdate - object to update
   * @return {Promise<any>}
   */
  static async updateThing(id, objectToUpdate) {
    console.log('[ThingDao][updateThing] Updating thing with params', id, objectToUpdate)
    try {
      const {name, description, imgId, reserved, serialNumber, categoryId, parkingType, hasCable, hasWhiteboard, ts} = objectToUpdate
      return ThingsCollection.update({_id: id}, {
        name: name,
        description: description,
        imgId: imgId,
        reserved: reserved,
        serial_number: serialNumber,
        categoryId: categoryId,
        parkingType: parkingType,
        hasCable: hasCable,
        hasWhiteboard: hasWhiteboard,
        timestamp: ts,

      })
    } catch (e) {
      console.error('[ThingDao][updateThing] An error occurred when updating thing in database', e)
      throw new Meteor.Error('0009', 'An error occurred in dao when updating thing', e.detail)
    }
  }
}

export default ThingDao

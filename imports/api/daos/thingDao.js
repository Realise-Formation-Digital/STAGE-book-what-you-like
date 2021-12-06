import ThingsCollection from "../collections/thingsCollection";

class ThingDao {


  /**
   * Insert a single thing
   * @param {string} name - title of the thing
   * @param {string} description - description  of the thing
   * @param {string} imgId  - image of the thing
   * @param {Boolean} reserved  - if the thing is reserved or not
   * @param {string} serial_number  - serial number of the thing
   * @param {string} categoryId - categoryId of the thing
   * @param {boolean} parkingType  - if location is
   * @param {boolean} hasCable  - if the thing need a cable
   * @param {boolean} hasWhiteBoard  - if needed a whiteboard
   * @param {number} ts - date of insertion of a thing
   * @returns {Promise<*>}
   */
  static async insertThing(name, description, reserved, serial_number, parkingType, hasCable, hasWhiteBoard, ts, categoryId) {
    console.log('[DAO][ThingDao][insertThing] Inserting thing with params', name, description, reserved, serial_number,categoryId, parkingType, hasCable, hasWhiteBoard, ts)
    try {
      return ThingsCollection.insert({
        name: name,
        description: description,
        //imgId: imgId,
        reserved: reserved,
        serial_number: serial_number,
        categoryId: categoryId, 
        parkingType: parkingType,
        hasCable: hasCable,
        hasWhiteBoard: hasWhiteBoard,
        ts: ts,

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
    console.log('[DAO][Thing][updateThing] Updating thing with params', id, objectToUpdate)
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
      console.error('[DAO][Thing][updateThing] An error occurred when updating thing in database', e)
      throw new Meteor.Error('0009', 'An error occurred in dao when updating thing', e.detail)
    }
  }
}

export default ThingDao

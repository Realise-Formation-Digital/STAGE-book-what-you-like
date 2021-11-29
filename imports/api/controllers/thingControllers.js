import {Meteor} from 'meteor/meteor';
import ThingModel from "../models/thingsModel";

Meteor.methods({

  //todo comment
  /**
   *
   * @param {string} name
   * @param {string} description
   * @param {boolean} reserved
   * @param {string} serial_number
   * @param {boolean} parkingType
   * @param {boolean} hasCable
   * @param {boolean} hasWhiteBoard
   * @returns {Promise<*>}
   */
  async insertThing(name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard) {
    try {
      console.log('[Controller][Things][insertThing] Inserting reservation with params', name, description, reserved, serial_number, parkingType, hasCable, hasWhiteBoard)
      let result = null
      const ts = new Date().getTime()
      result = ThingModel.insertThing(name, description, reserved, serial_number, hasCable, hasWhiteBoard, ts)
      return result
    } catch (e) {
      console.error('[Controller][Things][insertThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  /**
   * Removing a single reservation
   * @param {string} _id
   * @returns
   */
  async removeThing(id) {
    try {
      console.log('[Controller][Things][removeThing] Removing thing with params', id)
      let result = null
      result = ThingModel.removeThing(_id)
      return result
    } catch (e) {
      console.error('[Controller][Things][removeThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  // todo do a good comment
  // create method to modify thing
  async updateThing(id, objectToUpdate) {
    try {
      console.log('[Controller][Things][updateThing] Updating thing with params', id, objectToUpdate)
      let result = null
      result = ThingModel.updateThing(name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)
      return result
    } catch (e) {
      console.error('[Controller][Things][updateThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

});

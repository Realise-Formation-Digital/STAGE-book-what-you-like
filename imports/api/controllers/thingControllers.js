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
      console.log('[Controller][Reservation][insertThing] Inserting reservation with params', name, description, reserved, serial_number, parkingType, hasCable, hasWhiteBoard)
      let result = null
      const ts = new Date().getTime()
      result = ThingModel.insertThing(name, description, reserved, serial_number, hasCable, hasWhiteBoard, ts)
      return result
    } catch (e) {
      console.error('[ThingsController][insertThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  /**
   * Removing a single reservation
   * @param {string} _id
   * @returns
   */
  async removeThing(_id) {
    try {
      console.log('[Controller][Reservation][removeThing] Removing reservation with params', id)
      let result = null
      result = ThingModel.removeThing(_id)
      return result
    } catch (e) {
      console.error('[ThingsController][removeThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  // todo do a good comment
  // create method to modify thing
  async updateThing(_id, name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp) {
    try {
      let result = null

      console.log(_id, name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)

      result = ThingModel.updateThing(name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)

      return result
    } catch (e) {
      console.error('[ThingsController][updateThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

});

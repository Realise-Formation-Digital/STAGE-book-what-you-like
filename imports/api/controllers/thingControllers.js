import {Meteor} from 'meteor/meteor';
import ThingModel from "../models/thingsModel";

Meteor.methods({

  
  /**Create a single thing
   *
   * @param {string} name
   * @param {string} description
   * @param {boolean} reserved
   * @param {string} serial_number
   * @param {boolean} parkingType
   * @param {boolean} hasCable
   * @param {boolean} hasWhiteBoard
   * @param {string} categoryId - category id's thing
   * @returns {Promise<*>}
   */
  async insertThing(name, description, reserved, serial_number, parkingType = false, hasCable, hasWhiteBoard, categoryId) {
    try {
      console.log('[Controller][Things][insertThing] Inserting reservation with params', name, description, reserved, serial_number, parkingType, hasCable, hasWhiteBoard, categoryId)
      let result = null
      const ts = new Date().getTime()
      result = ThingModel.insertThing(name, description, reserved, serial_number, parkingType, hasCable, hasWhiteBoard, ts, categoryId)
      return result
    } catch (e) {
      console.error('[Controller][Things][insertThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  /**
   * Removing a single reservation
   * @param {string} id
   * @returns
   */
  async removeThing(id) {
    try {
      console.log('[Controller][Things][removeThing] Removing thing with params', id)
      let result = null
      result = ThingModel.removeThing(id)
      return result
    } catch (e) {
      console.error('[Controller][Things][removeThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

 
  // update a single thing
  /**
   * 
   * @param {string} id - id to update
   * @param {object} objectToUpdate - object that contains all the changes
   * @returns {promise<*>}
   */
  async updateThing(id, objectToUpdate) {
    try {
      console.log('[Controller][Things][updateThing] Updating thing with params', id, objectToUpdate)
      let result = null
      result = ThingModel.updateThing(id, objectToUpdate)
      return result
    } catch (e) {
      console.error('[Controller][Things][updateThing] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

});

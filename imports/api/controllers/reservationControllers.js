import {Meteor} from 'meteor/meteor';
import ReservationsModel from "../models/reservationsModel";
import Date from "../libs/Date.js";
import { check } from 'meteor/check';


Meteor.methods({

  /**Insert a single reservation
   * @param {string} title - Title of reservation
   * @param {string} thingId - thing to reserve
   * @param {string} categoryId - category to reserve
   * @param {number} tsFrom - ts form of reservation
   * @param {number} tsTo - ts to of reserve
   * @returns {Promise<*>}
   */
  async insertReservation(title, thingId, categoryId, tsFrom, tsTo) {
    try {
      console.log('[Controller][Reservation][insertReservation] Inserting reservation with params', title, thingId, categoryId, tsFrom, tsTo)
      
      check(title, String) // title verification for insert
      check(thingId, String) // thingId verification
      check(categoryId, String) // categoryId verification
      check(tsfrom, Number)// tsFrom verification
      check(tsTo, Number)// tsTo verification

      let result = null
      const userId = null
      const ts = Date.getTs();
      result = ReservationsModel.insertReservation(userId, thingId, categoryId, title, tsFrom, tsTo, ts)
      return result
    } catch (e) {
      console.error('[Controller][Reservation][insertReservation] An error occurred when insert a reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },


  /** Remove a single Reservation
   * @param {string} id
   * @returns {Promise<*>}
   */
  async removeReservation(id) {
    try {
      console.log('[Controller][Reservation][removeReservation] Removing reservation with params', id)
      check(id, String) // id verification to remove a reservation
      let result = null
      result = ReservationsModel.removeReservation(id)
      return result
    } catch (e) {
      console.error('[Controller][Reservations][removeReservation] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  

 /**Update a reservation
  * @param {string} id - id to update
  * @param {object} objectToUpdate - object that contains all the changes
  * @returns {promise<*>}
  */
  async updateReservation(id, objectToUpdate) {
    try {
      console.log('[Controller][Reservation][updateReservation] Removing reservation with params', id, objectToUpdate)
      check(id, String) // id verification to update a reservation
      check(objectToUpdate, Object)//object verification for update 
      let result = null
      result = await ReservationsModel.updateReservation(id, objectToUpdate)

      return result
    } catch (e) {
      console.error('[Controller][Reservations][updateReservation] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

});

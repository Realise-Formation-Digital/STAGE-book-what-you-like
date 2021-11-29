import {Meteor} from 'meteor/meteor';
import ReservationsModel from "../models/reservationsModel";

Meteor.methods({

  /**
   * Insert a single reservation
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
      let result = null
      const userId = null
      const ts = new Date().getTime()
      result = ReservationsModel.insertReservation(userId, thingId, categoryId, title, tsFrom, tsTo, ts)
      return result
    } catch (e) {
      console.error('[Controller][Reservation][insertReservation] An error occurred when insert a reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },


  /**
   * Remove a single Reservation
   * @param {string} id
   * @returns {Promise<*>}
   */
  async removeReservation(id) {
    try {
      console.log('[Controller][Reservation][removeReservation] Removing reservation with params', id)
      let result = null
      result = ReservationsModel.removeReservation(id)
      return result
    } catch (e) {
      console.error('[ReservationsController][removeReservation] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },

  // todo update
  // create method to modify reservation
  async updateReservation(id, objectToUpdate) {
    try {
      console.log('[Controller][Reservation][updateReservation] Removing reservation with params', id, objectToUpdate)
      let result = null
      result = await ReservationsModel.updateReservation(title, timestampFrom, timestampTo)

      return result
    } catch (e) {
      console.error('[ReservationsController][updateReservation] An error occurred', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

});

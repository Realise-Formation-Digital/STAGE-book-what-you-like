import ReservationDao from "../daos/reservationDao";

/**
 * @class
 * @classdesc Class that describe the model of reservation
 * @author Lionel Schuster
 */
class ReservationsModel {

  /**
   * Insert Reservation model
   * @param {string} userId - userid who did the action
   * @param {string} thingId - thing id of thing to reserve
   * @param {string} categoryId - category id of thing to reserve
   * @param {string} title - title of the reservation
   * @param {number} tsFrom  - ts from for the reservation
   * @param {number} tsTo - ts to for the reservation
   * @param {number} ts - ts to for the reservation
   * @returns {Promise<*>}
   */
  static async insertReservation(userId, thingId, categoryId, title, tsFrom, tsTo, ts) {
    try {
      console.log('[Model][Reservation][insertReservation] Inserting reservation with params', userId, thingId, categoryId, title, tsFrom, tsTo)
      let result = null
      result = ReservationDao.insertReservation(userId, thingId, categoryId, title, tsFrom, tsTo, ts)
      return result
    } catch (e) {
      console.error('[Model][Reservation][insertReservation] An error occurred when inserting reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /**
   * Delete single reservation
   * @param {string} id
   * @returns {Promise<*>}
   */
  static async removeReservation(id) {
    try {
      console.log('[Model][Reservation][removeReservation] Removing reservation with params', id)
      let result = null
      result = await ReservationDao.removeReservation(id)
      return result
    } catch (e) {
      console.error('[Model][Reservation][removeReservation] An error occurred when removing reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

  /* update the reservation*/
  static async updateReservation(userId, title, tsFrom, tsTo) {
    try {
      let result = null
      result = await ReservationDao.updateReservation(userId, title, tsFrom, tsTo)
      return result
    } catch (e) {
      console.error('[ReservationsModel][updateReservation] An error occurred when updating reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default ReservationsModel
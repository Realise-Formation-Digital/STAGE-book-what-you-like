import ReservationDao from "../daos/reservationDao";

/**
 * @class
 * @classdesc Class that describe the model of reservation
 * @author Lionel Schuster
 */
class ReservationsModel {

  /**
   * Insert Reservation model
   * @param title {string} - title of the reservation
   * @param tsFrom {number} - timestampFrom the reservation
   * @param tTo {number} - timestampTo the reservation
   * @returns {Promise<void>}
   */
  static async insertReservation (userId, title, tsFrom, tsTo) {
    try {
      let result = null

      result = ReservationDao.insertReservation(userId, title, tsFrom, tsTo)

      return result
    }catch (e) {
      console.error('[ReservationsModel][insertReservation] An error occurred when inserting reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
/**delete reservation
 * 
 * @param {string} _id 
 * @returns 
 */
  static async removeReservation (_id) {
    try {
      let result = null

      result = await ReservationDao.removeReservation(_id)

      return result
    }catch (e) {
      console.error('[ReservationsModel][removeReservation] An error occurred when removing reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
/* update the reservation*/
  static async updateReservation (userId, title, tsFrom, tsTo) {
    try {
      let result = null

      result = await ReservationDao.updateReservation(userId, title, tsFrom, tsTo)

      return result
    }catch (e) {
      console.error('[ReservationsModel][updateReservation] An error occurred when updating reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default ReservationsModel
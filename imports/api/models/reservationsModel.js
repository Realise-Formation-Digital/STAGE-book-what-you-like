import ReservationDao from "../daos/reservationDao";

/**
 * @class
 * @classdesc Class that describe the model of Reservation
 * @author Marco Tribuzio
 */
class ReservationsModel {

  /**
   * Insert Reservation model
   * @param name {string} - title of the Reservation
   * @param timestampFrom {number} - number start reservation
   * @param timestampTo {number} - number end of reservation
  
   * @returns {Promise<void>}
   */
  static async insertReservation (name, timestampFrom, timestampTo) {
    try {
      let result = null

      result = ReservationDao.insertReservation(name, timestampFrom, timestampTo)

      return result
    }catch (e) {
      console.error('[ReservationsModel][insertReservation] An error occurred when inserting reservation', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default ReservationsModel
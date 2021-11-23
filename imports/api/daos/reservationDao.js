import ReservationsCollection from "../collections/reservationsCollection";

class ReservationDao {

  /**
   * Insert Reservation
   * @param name {string} - title of the Reservation
   * @param timestampFrom {number} - number start reservation
   * @param timestampTo {number} - number end of reservation
   * @returns {Promise<any>}
   */
  static async insertReservation(name, timestampFrom, timestampTo){
    console.log('[ReservationDao][insertReservation] Inserting reservation with params', name, timestampFrom, timestampTo)
    try {
      return ReservationsCollection.insert({
        name : name,
        timestampFrom : timestampFrom,
        timestampTo : timestampTo,
      })
    }catch (e) {
      console.error('[ReservationDao][insertReservation] An error occurred when inserting reservation in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting reservation', e.detail)
    }
  }
}

export default ReservationDao
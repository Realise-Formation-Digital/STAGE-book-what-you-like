import ReservationsCollection from "../collections/reservationsCollection";

class ReservationDao {

  /**
   * Insert Reservation
   * @param name {string} - title of the Reservation
   * @param tsFrom {number} - number start reservation
   * @param tsTo {number} - number end of reservation
   * @returns {Promise<any>}
   */
  static async insertReservation(name, timestampFrom, timestampTo) {
    console.log('[ReservationDao][insertReservation] Inserting reservation with params', name, timestampFrom, timestampTo)
    try {
      return ReservationsCollection.insert({
        name: name,
        timestampFrom: timestampFrom,
        timestampTo: timestampTo,
      })
    } catch (e) {
      console.error('[ReservationDao][insertReservation] An error occurred when inserting reservation in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting reservation', e.detail)
    }
  }
  /** delete reservation
   * @param {string} _id
   * @returns
   */
  static async removeReservation(_id) {
    console.log('[ReservationDao][removeReservation] Removing reservation with params', _id)
    try {
      return ReservationsCollection.remove({
        '_id': _id
      })
    } catch (e) {
      console.error('[ReservationDao][removeReservation] An error occurred when removing reservation in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when removing reservation', e.detail)
    }
  }
 
  static async updateReservation(name, timestampFrom, timestampTo) {
    console.log('[ReservationDao][updateReservation] Updating reservation with params', name, timestampFrom, timestampTo)
    try {
      return ReservationsCollection.update({
        name: name,
        timestampFrom: timestampFrom,
        timestampTo: timestampTo,
      })
    } catch (e) {
      console.error('[ReservationDao][updateReservation] An error occurred when updating reservation in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when updating reservation', e.detail)
    }
  }
}


export default ReservationDao
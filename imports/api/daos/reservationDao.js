import ReservationsCollection from "../collections/reservationsCollection";

class ReservationDao {

  /**
   * Insert Reservation
   * @param {string} userId - user id
   * @param {string} thingId - thing id to reserve
   * @param {string} categoryId - category id to reserve
   * @param {string} title - title of the reservation
   * @param {number} tsFrom  - number start reservation
   * @param {number} tsTo - number end of reservation
   * @param {number} ts  - ts of reservation
   * @returns {Promise<*>}
   */
  static async insertReservation(userId, thingId, categoryId, title, tsFrom, tsTo, ts) {
    console.log('[DAO][Reservation][insertReservation] Inserting reservation with params', userId, thingId, categoryId, title, tsFrom, tsTo, ts)
    try {
      return ReservationsCollection.insert({
        title: title,
        thingId: thingId,
        categoryId: categoryId,
        tsFrom: tsFrom,
        tsTo: tsTo,
        ts: ts
      })
    } catch (e) {
      console.error('[ReservationDao][insertReservation] An error occurred when inserting reservation in database', e)
      throw new Meteor.Error('0004', 'An error occurred in dao when inserting reservation', e.detail)
    }
  }
  /**
   * Delete single reservation
   * @param {string} id - id to remove
   * @returns {Promise<*>}
   */
  static async removeReservation(id) {
    console.log('[DAO][Reservation][removeReservation] Removing reservation with params', id)
    try {
      return ReservationsCollection.remove({
        '_id': id
      })
    } catch (e) {
      console.error('[DAO][Reservation][removeReservation] An error occurred when removing reservation in database', e)
      throw new Meteor.Error('0005', 'An error occurred in dao when removing reservation', e.detail)
    }
  }

  /**
   * Update a single reservation
   * @param {string} id - id to update
   * @param {object} objectToUpdate - object to update
   * @return {Promise<void>}
   */
  static async updateReservation(id, objectToUpdate) {
    console.log('[DAO][Reservation][updateReservation] Updating reservation with params', id, objectToUpdate)
    try {
      const{userId, thingId, categoryId, title, tsFrom, tsTo, ts} = objectToUpdate  
      return ReservationsCollection.update({_id : id}, {
        userId : userId,
        thingId : thingId,
        categoryId : categoryId,
        title : title,
        tsFrom: tsFrom,
        tsTo: tsTo,
        ts : ts
      })
    } catch (e) {
      console.error('[DAO][Reservation][updateReservation] An error occurred when updating reservation in database', e)
      throw new Meteor.Error('0006', 'An error occurred in dao when updating reservation', e.detail)
    }
  }
}


export default ReservationDao

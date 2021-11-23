import { Meteor } from 'meteor/meteor';

import ReservationsModel from "../models/reservationsModel";

Meteor.methods({

  async insertReservation(title, timestampFrom, timestampTo) {
    try {
     

      let result = null
      

      result = ReservationsModel.insertReservation(title, timestampFrom, timestampTo)

      return result

    }catch (e) {
      console.error('[ReservationController][]')
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },


    /**
     * 
     * @param {string} _id 
     * @returns 
     */
     async removeReservation(_id) {
      try {
          let result = null

          console.log(_id)

          
          result = ReservationsModel.removeReservation(_id)

          return result
      } catch (e) {
          console.error('[ReservationsController][removeReservation] An error occurred', e)
          throw new Meteor.Error(e.error, e.reason, e.details)
      }
  },
  // create method to modify reservation
  async updateReservation (title, timestampFrom, timestampTo) {
      try {
          let result = null

          console.log(title, timestampFrom, timestampTo)

          result = ReservationsModel.updateReservation(title, timestampFrom, timestampTo)

          return result
      } catch (e) {
          console.error('[ReservationsController][updateReservation] An error occurred', e)
          throw new Meteor.Error(e.error, e.reason, e.details)
      }
  }

});

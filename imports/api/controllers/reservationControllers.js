import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ReservationsModel from "../models/reservationsModel";

Meteor.methods({

  async insertReservation(name, tsFrom, tsTo) {
    try {
     

      let result = null
    

      result = ReservationsModel.insertReservation(name, tsFrom, tsTo)

      return result

    }catch (e) {
      console.error('[ReservationController][]')
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },
    //create method to delete reservation
    async removeReservation(_id) {
        try {
            let result = null

            console.log(_id)

            result = ReservationsModel.removeReservation(_id)

            return result
        } catch (e) {
            console.error('[ReservationsController][removeResrvation] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },
    // create method to modify reservation
    async updatereservation(_id, userName, timestampFrom, timestampTo) {
        try {
            let result = null

            console.log(_id, userName, timestampFrom, timestampTo)

            result = ResrvationsModel.updateReservation(_id,userName, timestampFrom, timestampTo)

            return result
        } catch (e) {
            console.error('[ReservationsController][updateReservation] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

});




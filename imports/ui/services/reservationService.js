import { meteorCall } from "../libs/meteorCalls";
import { meteorMethods } from "../libs/defaultValues";

class ReservationService {

    static async insertReservation(from, to, thinks, user, category) {
        try {
            console.log('[Services][insertReservation] Insert reservation with params', from, to, thinks, user, category)
            return meteorCall()
        } catch (e) {
            console.error('[Services][reservationService][insertReservation] An error occurred when insert reservation', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

    static async deleteReservation(id) {
        try {
            console.log('[Services][deleteReservation] Delete reservation with params', id)
            return meteorCall()
        } catch (e) {
            console.error('[Services][reservationService][deleteSelectedItem] An error occurred when deleteSelectedItem', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

    static async updateReservation(id, objectToUpdate) {
        try {
            console.log('[Services][updateReservation] Updating reservation with params', id, objectToUpdate)
            return meteorCall()
        } catch (e) {
            console.error('[Services][reservationService][updateReservation] An error occurred when update reservation', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }
}

export default ReservationService

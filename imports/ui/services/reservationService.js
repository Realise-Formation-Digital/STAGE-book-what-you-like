import { meteorCall } from "../libs/meteorCalls";
import { meteorMethods } from "../libs/defaultValues";

class ReservationService {

    static async insertReservation(from, to, thinks, user, category) {
        try {
            return meteorCall()
        } catch (e) {
            console.error('[Services][reservationService][insertReservation] An error occurred when insert reservation', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

    static async deleteSelectedItem(id) {
        try {
            return meteorCall()
        } catch (e) {
            console.error('[Services][reservationService][deleteSelectedItem] An error occurred when deleteSelectedItem', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }
}

export default ReservationService
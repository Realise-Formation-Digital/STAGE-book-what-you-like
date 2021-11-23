import { Meteor } from 'meteor/meteor';

import ThingModel from "../models/thingsModel";

Meteor.methods({
    //create method for create thing
    async insertThing(name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp) {
        try {

            let result = null

            console.log(name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)

            result = ThingModel.insertThing(name, description , reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)

            return result

        } catch (e) {
            console.error('[ThingsController][insertThing] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },

    /**
     * 
     * @param {string} _id 
     * @returns 
     */
    async removeThing(_id) {
        try {
            let result = null

            console.log(_id)

            
            result = ThingModel.removeThing(_id)

            return result
        } catch (e) {
            console.error('[ThingsController][removeThing] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    },
    // create method to modify thing
    async updateThing(_id, name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp) {
        try {
            let result = null

            console.log(_id, name, description, reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)

            result = ThingModel.updateThing(name, description , reserved, serial_number, parkingType = null, hasCable, hasWhiteBoard, timestamp)

            return result
        } catch (e) {
            console.error('[ThingsController][updateThing] An error occurred', e)
            throw new Meteor.Error(e.error, e.reason, e.details)
        }
    }

});

import {Meteor} from "meteor/meteor";
import reservationsCollection from "../collections/reservationsCollection";

Meteor.publish('reservationsList', function () {
  return reservationsCollection.find();
});

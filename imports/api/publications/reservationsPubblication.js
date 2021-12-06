import {Meteor} from "meteor/meteor";
import reservationsCollection from "../collections/reservationsCollection";

Meteor.publish('', function () {
  return reservationsCollection.find();
});

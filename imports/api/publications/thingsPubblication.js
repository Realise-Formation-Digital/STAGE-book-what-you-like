import {Meteor} from "meteor/meteor";
import thingsCollection from "../collections/thingsCollection";

Meteor.publish('thingsList', function () {
  return thingsCollection.find()
});

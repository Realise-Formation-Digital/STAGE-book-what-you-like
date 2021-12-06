import {Meteor} from "meteor/meteor";
import thingsCollection from "../collections/thingsCollection";
import { dayjs } from 'dayjs';

Meteor.publish('thingsList', function () {
  console.log(dayjs().format());
  return thingsCollection.find()
});

import {Meteor} from "meteor/meteor";
import reservationsCollection from "../collections/reservationsCollection";
import { dayjs } from 'dayjs';

Meteor.publish('reservationsList', function () {
  console.log(dayjs().format());
  return reservationsCollection.find();
});

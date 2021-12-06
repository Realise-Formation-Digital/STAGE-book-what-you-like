import {Meteor} from "meteor/meteor";
import categoriesCollection from "../collections/categoriesCollection";
/* var dayjs = require('dayjs') */
import { dayjs } from 'dayjs';

Meteor.publish('categoriesList', function () {
  console.log(dayjs().format());
  return categoriesCollection.find()
});

import {Meteor} from "meteor/meteor";
import categoriesCollection from "../collections/categoriesCollection";

Meteor.publish('categoriesList', function () {
  return categoriesCollection.find()
});

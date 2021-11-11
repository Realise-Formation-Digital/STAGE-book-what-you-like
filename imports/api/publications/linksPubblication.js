import { Meteor } from 'meteor/meteor';
import LinksCollection from '../collections/linksCollection.js';

Meteor.publish('links', function () {
  return LinksCollection.find();
});

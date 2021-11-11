/**
 * EXAMPLE
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import LinksModel from "../models/linksModel";

Meteor.methods({

  async createLink(title, url) {
    try {
      check(url, String);
      check(title, String);

      let result = null
      let date = new Date();

      result = LinksModel.insertLink(title, url, date)

      return result

    }catch (e) {
      console.error('[LinkController][]')
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  },
});

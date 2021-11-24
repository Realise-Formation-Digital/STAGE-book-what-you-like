/**
 * EXAMPLE
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import LinksModel from "../models/linksModel";

Meteor.methods({

  async insertLink(title, url) {
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
    /**
     * 
     * @param {string} _id 
     * @returns 
     */
     async removeLink(_id) {
      try {
          let result = null

          console.log(_id)

          
          result = LinksModel.removeLink(_id)

          return result
      } catch (e) {
          console.error('[LinksController][removeLink] An error occurred', e)
          throw new Meteor.Error(e.error, e.reason, e.details)
      }
  },
  // create method to modify link
  async updateLink (title, url, date) {
      try {
          let result = null

          console.log(title, url, date)

          result = LinksModel.updateLink(title, url, date)

          return result
      } catch (e) {
          console.error('[ReservationsController][updateReservation] An error occurred', e)
          throw new Meteor.Error(e.error, e.reason, e.details)
      }
  }

});


import LinkDao from "../daos/linkDao";

/**
 * @class
 * @classdesc Class that describe the model of Link
 * @author Marco Tribuzio
 */
class LinksModel {

  /**
   * Insert Link model
   * @param title {string} - title of the link
   * @param url {string} - url of the title
   * @param date {Date} - date of insertion
   * @returns {Promise<void>}
   */
  static async insertLink (title, url , date) {
    try {
      let result = null

      result = LinkDao.insertLink(title, url, date)

      return result
    }catch (e) {
      console.error('[LinksModel][insertLink] An error occurred when inserting link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }
}

export default LinksModel
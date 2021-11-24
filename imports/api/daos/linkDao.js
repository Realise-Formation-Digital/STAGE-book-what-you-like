import LinksCollection from "../collections/linksCollection";

class LinkDao {

  /**
   * Insert Link
   * @param title {string} - title of the link
   * @param url {string} - url of the title
   * @param date {Date} - date of insertion
   * @returns {Promise<any>}
   */
  static async insertLink(title, url, date) {
    console.log('[LinkDao][insertLink] Inserting link with params', title, url, date)
    try {
      return LinksCollection.insert({
        title: title,
        url: url,
        date: date
      })
    } catch (e) {
      console.error('[LinkDao][insertLink] An error occurred when inserting link in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting link', e.detail)
    }
  }
  /** delete the link
   * 
   * @param {string} _id 
   * @returns 
   */
  static async removeLink(_id) {
    console.log('[LinkDao][removeLink] removing link with params', _id)
    try {
      return LinksCollection.remove({
        '_id': _id
      })
    } catch (e) {
      console.error('[LinkDao][removeLink] An error occurred when removing link in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting link', e.detail)
    }
  }

  static async updateLink(title, url, date) {
    console.log('[LinkDao][updateLink] Updating link with params', title, url, date)
    try {
      return LinksCollection.update({
        title: title,
        url: url,
        date: date
      })
    } catch (e) {
      console.error('[LinkDao][updateLink] An error occurred when updating link in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when updating link', e.detail)
    }
  }
}

export default LinkDao
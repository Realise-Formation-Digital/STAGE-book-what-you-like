import LinksCollection from "../collections/linksCollection";

class LinkDao {

  /**
   * Insert Link
   * @param title {string} - title of the link
   * @param url {string} - url of the title
   * @param date {Date} - date of insertion
   * @returns {Promise<any>}
   */
  static async insertLink(title, url, date){
    console.log('[LinkDao][insertLink] Inserting link with params', title, url, date)
    try {
      return LinksCollection.insert({
        title: title,
        url: url,
        date: date
      })
    }catch (e) {
      console.error('[LinkDao][insertLink] An error occurred when inserting link in database', e)
      throw new Meteor.Error('0001', 'An error occurred in dao when inserting link', e.detail)
    }
  }
}

export default LinkDao
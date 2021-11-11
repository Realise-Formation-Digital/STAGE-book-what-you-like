import {meteorCall} from "../libs/meteorCalls";
import {meteorMethods} from "../libs/defaultValues";

class LinkService {

  static async insertLink(title, url){
    try{
      return meteorCall(meteorMethods.insertLink, title, url)
    }catch (e) {
      console.error('[Services][LinkService][insertLink] An error occurred when insert link', e)
      throw new Meteor.Error(e.error, e.reason, e.details)
    }
  }

}

export default LinkService
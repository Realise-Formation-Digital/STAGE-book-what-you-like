import dayjs from "dayjs";

/**
 * @class
 * @classdesc Handle DayJS Library
 * @author Lionel
 */
class Date {

    static getTs(){
        return dayjs().unix()
    }

}

export default Date
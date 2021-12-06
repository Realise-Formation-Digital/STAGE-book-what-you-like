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

    static getTSbyDate(ISODate){
        return dayjs(ISODate).unix()
    }

}

export default Date
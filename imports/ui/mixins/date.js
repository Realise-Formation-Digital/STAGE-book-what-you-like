import dayjs from "dayjs"

const dateMixin = {
  methods: {
    getUnixTs () {
      return new Date().getTime()
    },

    getUnixTsByDate(date){
      return new Date(date).getTime()
    },

    getTs (date){
      return dayjs(date)
    },

    getUnixTsFromDate(date) {
      return dayjs(date).unix()
    },

    getDateFromUnixTs(ts) {
      return dayjs(ts).format('YYYY-MM-DD HH:MM')
    }
  }
}

export default dateMixin

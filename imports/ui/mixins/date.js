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
    }
  }
}

export default dateMixin

const dateMixin = {
  methods: {
    getUnixTs () {
      return new Date().getTime()
    },

    getUnixTsByDate(date){
      return new Date(date).getTime()
    }
  }
}

export default dateMixin

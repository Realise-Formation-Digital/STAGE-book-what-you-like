import i18nnext from 'i18next'

const i18nMixin = {
  methods: {
    getTranslation(key){
      return i18nnext.t(key)
    }
  }
}

export default i18nMixin

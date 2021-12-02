import i18next from 'i18next';

const i18nMixin = {
  methods: {
    getTranslation(key) {
      return i18next.t(key)
    }
  }
}
export default i18nMixin

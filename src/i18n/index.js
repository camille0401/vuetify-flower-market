import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import ja from './ja'

const savedLang = localStorage.getItem('fmlang') || 'zhCN'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLang, //默认语言
  fallbackLocale: 'ja', //备用语言
  messages: {
    zhCN,
    ja
  }
})

export default i18n

import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN.json';
import jaJP from './ja-JP.json';

const savedLang = localStorage.getItem('fmlang') || 'zh-CN';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh-CN', //默认语言
  fallbackLocale: 'zh-CN', //备用语言
  messages: {
    'zh-CN': zhCN,
    ja: jaJP,
  },
});

export default i18n;

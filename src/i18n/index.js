import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN.json';
import ja from './ja.json';

const savedLang = localStorage.getItem('fmlang') || 'zhCN';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zhCN', //默认语言
  fallbackLocale: 'zhCN', //备用语言
  messages: {
    zhCN,
    ja,
  },
});

export default i18n;

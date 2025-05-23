import { createVuetify } from 'vuetify';
import { zhHans, ja } from 'vuetify/locale';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
// import i18n from '../i18n';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const milkTeaLight = {
  dark: false,
  colors: {
    background: '#FFF8F5', // 乳白带粉背景
    surface: '#FFFFFF',
    primary: '#E8B4B8', // 奶茶粉主色
    'primary-darken-1': '#D99A9F',
    'primary-darken-2': '#C1858C',
    'primary-lighten-1': '#F0C8CA',
    secondary: '#D9A79C', // 奶茶棕色
    'secondary-darken-1': '#C99588',
    'secondary-lighten-1': '#E3BCB3',
    accent: '#C78283', // 深粉点缀
    error: '#E57373',
    info: '#64B5F6',
    success: '#81C784',
    warning: '#FFB74D',
    'on-primary': '#FFFFFF', // 主色上的文字
    'on-secondary': '#FFFFFF',
  },
};

const milkTeaDark = {
  dark: true,
  colors: {
    background: '#1E1715', // 深奶茶背景
    surface: '#2A211F',
    primary: '#D99A9F', // 更温柔的粉色
    secondary: '#C99588',
    accent: '#B57375',
    error: '#EF9A9A',
    info: '#90CAF9',
    success: '#A5D6A7',
    warning: '#FFE082',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
  },
};

export default createVuetify({
  locale: {
    locale: 'ja',
    fallback: 'zhHans',
    messages: {
      zhHans,
      ja,
    },
  },
  theme: {
    defaultTheme: 'milkTeaLight', // 默认亮色
    themes: {
      milkTeaLight,
      milkTeaDark,
    },
    variations: {
      colors: ['primary', 'secondary', 'accent'],
      lighten: 2,
      darken: 2,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
});

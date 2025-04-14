import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const milkTeaTheme = {
  dark: false,
  colors: {
    background: '#FFF8F5', // 乳白色带粉调
    surface: '#FFFFFF', // 纯白表面
    'surface-variant': '#D99A9F', // 奶茶色变体
    primary: '#E8B4B8', // 奶茶中的粉色调
    'primary-darken-1': '#D99A9F',
    'primary-lighten-1': '#F0C8CA',
    secondary: '#D9A79C', // 奶茶色
    'secondary-darken-1': '#C99588',
    'secondary-lighten-1': '#E3BCB3',
    accent: '#C78283', // 深奶茶粉
    error: '#E57373',
    info: '#64B5F6',
    success: '#81C784',
    warning: '#FFB74D',
    'on-primary': '#FFFFFF', // 主色上的文字颜色
    'on-secondary': '#FFFFFF' // 辅助色上的文字颜色
  }
  // variables: {
  //   'font-size-root': '12px'
  // }
}

const milkTeaDarkTheme = {
  dark: true,
  colors: {
    background: '#1E1715',
    surface: '#2A211F',
    'surface-variant': '#3A2E2B',
    primary: '#D99A9F',
    secondary: '#C99588',
    accent: '#B57375',
    error: '#EF9A9A',
    info: '#90CAF9',
    success: '#A5D6A7',
    warning: '#FFE082'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: milkTeaTheme
    },
    variations: {
      colors: ['primary', 'secondary', 'accent'],
      lighten: 2,
      darken: 2
    }
  },
  icons: {
    defaultSet: 'mdi'
  },
  components,
  directives
})

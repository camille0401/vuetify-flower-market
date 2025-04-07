import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const fsCustomTheme = {
  dark: false,
  light: {
    primary: 'red',
  },
  colors: {
    background: '#FAFAFA',
    primary: '#880E4F',
    // surface: '#000000',
    secondary: '#0d1117',
    success: '#009688',
    // error: '#f78166', // 错误色
    // info: '#2196F3', // 信息色
    // warning: '#FFC107', // 警告色
    'on-surface	': '#FFFFFF',
  },
  variables: {
    'font-size-root': '12px',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: fsCustomTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

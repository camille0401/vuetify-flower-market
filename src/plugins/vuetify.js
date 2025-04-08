import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const fsCustomTheme = {
  dark: false,
  light: {
    primary: 'red'
  },
  colors: {
    primary: '#880E4F',
    secondary: '#E91E63',
    surface: '#FFFFFF',
    accent: '#9c27b0',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50'
  },
  variables: {
    'font-size-root': '12px'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: fsCustomTheme
    }
  },
  icons: {
    defaultSet: 'mdi'
  },
  components,
  directives
})

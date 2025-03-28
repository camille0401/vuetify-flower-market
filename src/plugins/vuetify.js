import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const fsCustomLightTheme = {
  dark: false,
  light: {
    primary: '#EC407A',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#e84393',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#1dc779',
    warning: '#FB8C00',
  },
  variables: {
    'font-size-root': '14px',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'fsCustomLightTheme',
    themes: {
      fsCustomLightTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

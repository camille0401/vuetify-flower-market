import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const fsCustomTheme = {
  dark: false,
  light: {
    primary: '#795548',
  },
  colors: {
    primary: '#795548',
    surface: '#795548',
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

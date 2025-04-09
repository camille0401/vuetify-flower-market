import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const fsCustomTheme = {
  dark: false,
  colors: {
    primary: '#009688', // 主色：浅粉红
    secondary: '#f78166', // 次色：浅绿
    // background: '#FFF5EE', // 背景色：贝壳白
    background: '#FFFFFF',
    accent: '#FFF5EE', // 强调色：纯白
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

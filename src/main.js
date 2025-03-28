import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { lazyImgPlugin } from '@/directives'

// Vuetify

// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import vuetify from './plugins/vuetify'
import './styles/common.scss'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(lazyImgPlugin)

// const vuetify = createVuetify({
//   components,
//   directives,
// })

app.use(vuetify)

app.mount('#app')

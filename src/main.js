import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { lazyImgPlugin } from '@/plugins/lazyImg'

// Vuetify
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification'
// 导入CSS文件，或者使用自己的样式
import 'vue-toastification/dist/index.css'

import './styles/common.scss'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(lazyImgPlugin)
app.use(vuetify)
app.use(Toast, {})

app.mount('#app')

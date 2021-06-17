import { createApp } from 'vue'
import App from './App.vue'
import router from './router/interceptor'
import { setupStore } from './store'
/** antd */
import Antd from 'ant-design-vue'
import './assets/style/reset.less'

import { registerComponents } from './components'
import { setupCommon } from './utils/common'
import { setupTheme } from './utils/theme'

const app = createApp(App)

setupStore(app)
setupCommon(app)
setupTheme()

registerComponents(app)
app.use(router).use(Antd).mount('#app')

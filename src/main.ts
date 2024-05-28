import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Adiciona os ícones à biblioteca FontAwesome
library.add(faHome, faChartBar)

const app = createApp(App)

// Registra o componente FontAwesome globalmente
app.component('font-awesome-icon', FontAwesomeIcon)

// Uso do Vuex e Vue Router
app.use(store).use(router).mount('#app')

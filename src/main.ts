import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Importações do FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Adicionando ícones à biblioteca FontAwesome
library.add(faHome, faChartBar, faUser);

const app = createApp(App);

// Registrando o componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

// Adicionando Vuex e Vue Router
app.use(store);
app.use(router);

// Montando a aplicação no elemento #app
app.mount('#app');

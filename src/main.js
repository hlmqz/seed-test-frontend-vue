
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/es'
import quasarIconSet from 'quasar/icon-set/material-symbols-outlined'

import { v4 as uuidv4 } from 'uuid';

if(typeof window.crypto.randomUUID == 'undefined'){
	window.crypto.randomUUID = uuidv4;
}

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'

import 'quasar/src/css/index.sass'
import './assets/main.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Quasar, {
	plugins: {}, // import Quasar plugins and add here
	lang: quasarLang,
	iconSet: quasarIconSet,
})

app.mount('#app')

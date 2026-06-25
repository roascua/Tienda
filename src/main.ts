import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createUnhead } from 'unhead'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App);

// Crear instancia de unhead
const head = createUnhead()

// Plugin personalizado para proporcionar head a todos los componentes
const headPlugin = {
  install(app: any) {
    app.provide('usehead', head)
  }
}

app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true
});

app.use(ToastService)
app.use(ConfirmationService)
app.directive('ripple', Ripple)
app.use(createPinia())
app.use(headPlugin)
app.use(router)

app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

const head = createHead()

app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true
})

app.use(ToastService)
app.use(ConfirmationService)
app.directive('ripple', Ripple)
app.use(createPinia())
app.use(head)
app.use(router)

app.mount('#app')

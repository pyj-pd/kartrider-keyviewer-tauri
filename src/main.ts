import { createApp } from "vue"
import App from "./App.vue"

import { createPinia } from "pinia"

import PrimeVue, { type PrimeVueConfiguration } from "primevue/config"
import { theme } from "./styles/theme"
import { ToastService } from "primevue"

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

app.use(PrimeVue, {
  theme,
} as PrimeVueConfiguration)
app.use(ToastService)

app.mount("#app")

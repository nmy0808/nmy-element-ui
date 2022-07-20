import { createApp } from 'vue'
import App from './App.vue'
import { setupApp } from '@/global'
import nUi from '@/components/n-ui/index.es.js'
import '@/components/n-ui/style.css'
const app = createApp(App)
setupApp(app)
console.log(nUi)
app.use(nUi)

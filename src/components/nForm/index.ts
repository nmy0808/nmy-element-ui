import { App } from 'vue'
import NForm from './src/index.vue'
export default {
  install(app: App) {
    app.component(NForm.name, NForm)
  }
}

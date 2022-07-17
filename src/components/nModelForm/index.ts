import { App } from 'vue'
import NModelForm from './src/index.vue'
export default {
  install(app: App) {
    app.component(NModelForm.name, NModelForm)
  }
}

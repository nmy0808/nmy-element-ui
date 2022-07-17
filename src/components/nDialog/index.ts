import { App } from 'vue'
import NDialog from './src/index.vue'
export default {
  install(app: App) {
    app.component(NDialog.name, NDialog)
  }
}

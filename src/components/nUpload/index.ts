import { App } from 'vue'
import NUpload from './src/index.vue'
export default {
  install(app: App) {
    app.component(NUpload.name, NUpload)
  }
}

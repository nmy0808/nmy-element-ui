import { App } from 'vue'
import NEditor from './src/index.vue'
export default {
  install(app: App) {
    app.component(NEditor.name, NEditor)
  }
}

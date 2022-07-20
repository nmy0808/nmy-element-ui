import { App } from 'vue'
import NIcon from './src/index.vue'
export default {
  install(app: App) {
    app.component(NIcon.name, NIcon)
  }
}

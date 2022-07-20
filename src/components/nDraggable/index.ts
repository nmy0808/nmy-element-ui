import { App } from 'vue'
import NDraggable from './src/index.vue'
export default {
  install(app: App) {
    app.component(NDraggable.name, NDraggable)
  }
}

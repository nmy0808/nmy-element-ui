import { App } from 'vue'
import IconChoose from './src/index.vue'
export default {
  install(app: App) {
    app.component('IconChoose', IconChoose)
  }
}

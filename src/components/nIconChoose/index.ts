import { App } from 'vue'
import NIconChoose from './src/index.vue'
export default {
  install(app: App) {
    app.component('NIconChoose', NIconChoose)
  }
}

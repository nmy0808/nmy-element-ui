import { App } from 'vue'
import NTable from './src/index.vue'
export default {
  install(app: App) {
    app.component(NTable.name, NTable)
  }
}

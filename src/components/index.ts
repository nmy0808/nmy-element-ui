import { App } from 'vue'
import IconChoose from './iconChoose'
import NForm from './nForm'

const components = [IconChoose, NForm]
export default {
  install(app: App) {
    components.forEach((com) => {
      app.use(com)
    })
  }
}

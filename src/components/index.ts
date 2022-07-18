import { App } from 'vue'
import IconChoose from './iconChoose'
import NForm from './nForm'
import NEditor from './nEditor'
import NDialog from './nDialog'
import NModelForm from './nModelForm'
import NTable from './NTable'

const components = [IconChoose, NForm, NEditor, NDialog, NModelForm, NTable]
export default {
  install(app: App) {
    components.forEach((com) => {
      app.use(com)
    })
  }
}

import { App } from 'vue'
import NIcon from './nIcon'
import IconChoose from './iconChoose'
import NForm from './nForm'
import NEditor from './nEditor'
import NDialog from './nDialog'
import NModelForm from './nModelForm'
import NTable from './NTable'
import NDraggable from './nDraggable'
import NUpload from './NUpload'

const components = [
  NIcon,
  IconChoose,
  NForm,
  NEditor,
  NDialog,
  NModelForm,
  NTable,
  NDraggable,
  NUpload
]
export default {
  install(app: App) {
    components.forEach((com) => {
      app.use(com)
    })
  }
}

import type { App } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/'
import 'virtual:windi.css'
import '@/styles/index.scss'
import { setupElementPlus, setupElementIcon } from '@/utils/elementPlus'
import { setupDirective } from '@/directives/'
// import customComponents from '@/components/'
export const setupApp = (app: App) => {
  app.use(router)
  app.use(createPinia())
  app.use(setupElementPlus)
  app.use(setupElementIcon)
  app.use(setupDirective)
  // app.use(customComponents)
  app.mount('#app')
}

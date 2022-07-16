import { App } from 'vue'
export const components = import.meta.globEager('./modules/*.ts')

export const setupDirective = (app: App) => {
  Object.entries(components).forEach(([k, v]) => {
    app.directive(Object.keys(v)[0], Object.values(v)[0])
  })
}

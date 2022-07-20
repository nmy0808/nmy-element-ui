import {
  defineComponent,
  resolveComponent,
  openBlock,
  createElementBlock,
  createVNode,
  normalizeProps,
  guardReactiveProps,
  withCtx,
  createBlock,
  resolveDynamicComponent
} from 'vue'
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() =>
  '.n-icon[data-v-0026ae04]{display:inline-block}\n')()
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc
  for (const [key, val] of props) {
    target[key] = val
  }
  return target
}
const _hoisted_1 = { class: 'n-icon' }
const __default__ = {
  name: 'NIcon'
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    icon: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent('el-icon')
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createVNode(
            _component_el_icon,
            normalizeProps(guardReactiveProps(_ctx.$attrs)),
            {
              default: withCtx(() => [
                (openBlock(),
                createBlock(resolveDynamicComponent(__props.icon)))
              ]),
              _: 1
            },
            16
          )
        ])
      )
    }
  }
})
var NIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ['__scopeId', 'data-v-0026ae04']
])
var index = {
  install(app) {
    app.component(NIcon.name, NIcon)
  }
}
export { index as default }

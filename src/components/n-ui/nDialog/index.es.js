import { defineComponent, resolveComponent, openBlock, createBlock, mergeProps, withCtx, renderSlot, createVNode } from "vue";
const __default__ = {
  name: "NDialog"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    dialogOptions: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:visible", "closed"],
  setup(__props, { emit }) {
    const props = __props;
    const currentVisible = ref(props.visible);
    watch(() => props.visible, () => {
      currentVisible.value = props.visible;
    });
    watch(currentVisible, () => {
      emit("update:visible", currentVisible.value);
    });
    const handleClosed = () => {
      emit("closed");
    };
    return (_ctx, _cache) => {
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createBlock(_component_el_dialog, mergeProps({
        "destroy-on-close": "",
        title: __props.title
      }, __props.dialogOptions, {
        onClosed: handleClosed,
        modelValue: currentVisible.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currentVisible.value = $event)
      }), {
        footer: withCtx(() => [
          renderSlot(_ctx.$slots, "footer")
        ]),
        default: withCtx(() => [
          createVNode(_component_el_scrollbar, { height: "64vh" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "body")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 16, ["title", "modelValue"]);
    };
  }
});
var index = {
  install(app) {
    app.component(_sfc_main.name, _sfc_main);
  }
};
export { index as default };

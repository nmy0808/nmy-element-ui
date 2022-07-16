<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor,
  IToolbarConfig
} from '@wangeditor/editor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  height: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', html: string): void
  (e: 'change', html: string): void
}>()

const editorRef = ref(null)
const toolbarRef = ref(null)
let editor: any
const init = () => {
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {}
  editorConfig.placeholder = props.placeholder
  editorConfig.onChange = (editor: IDomEditor) => {
    // 当编辑器选区、内容变化时，即触发
    emit('update:modelValue', editor.getHtml())
    emit('change', editor.getHtml())
  }

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 创建编辑器
  editor = createEditor({
    selector: editorRef.value as any,
    config: editorConfig,
    mode: 'default' // 或 'simple' 参考下文
  })
  // // 创建工具栏
  const toolbar = createToolbar({
    editor,
    selector: toolbarRef.value as any,
    config: toolbarConfig,
    mode: 'default' // 或 'simple' 参考下文
  })
}

watch(
  () => props.modelValue,
  () => {
    if (editorRef.value) {
      nextTick(() => {
        editor.setHtml(props.modelValue || `<p></p>`)
        editor.placeholder = props.placeholder
      })
    }
  }
)

onMounted(() => {
  if (editorRef.value) {
    init()
    nextTick(() => {
      editor.setHtml(props.modelValue)
      editor.placeholder = props.placeholder
    })
  }
})
onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
  }
})
</script>

<template>
  <div class="el-card">
    <div ref="toolbarRef" style="width: 100%"></div>
    <div
      ref="editorRef"
      :style="{ height: height + 'px', width: '100%' }"
    ></div>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'NEditor'
}
</script>

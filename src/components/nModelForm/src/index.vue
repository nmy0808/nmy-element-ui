<script setup lang="ts">
import { PropType } from 'vue'
import NForm from '../../nForm/src/index.vue'
import { IFormSchema } from '../../nForm/src/types/options'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  dialogOptions: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  confirmBtnText: {
    type: String,
    default: '确定'
  },
  cancelBtnText: {
    type: String,
    default: '取消'
  },
  schema: {
    type: Array as PropType<IFormSchema[]>,
    required: true
  },
  formOptions: {
    type: Object,
    default: () => ({ labelWidth: 120 })
  }
})
type InsertFnType = (url: string, alt: string, href: string) => void

const emit = defineEmits<{
  (e: 'update:visible', flag: boolean): void
  (e: 'confirm', model: any): void
}>()
const currentVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    currentVisible.value = props.visible
  }
)
watch(currentVisible, () => {
  emit('update:visible', currentVisible.value)
})

const nFormRef = ref<InstanceType<typeof NForm> | null>(null)

const validate = () => nFormRef.value?.validate()
const resetFields = () => nFormRef.value?.resetFields()
const getModel = () => nFormRef.value?.getModel()

const handleConfirm = async () => {
  const flag = await validate!()
  flag && emit('confirm', getModel!())
}

const handleClosed = () => {
  resetFields!()
}

defineExpose({
  validate,
  resetFields,
  getModel // 获取表单最后生成的model数据 (已经deepCopy, 放心使用)
})
</script>

<template>
  <NDialog
    top="5vh"
    width="80vw"
    :title="title"
    custom-class="model-form-px-20"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="dialogOptions"
    v-model:visible="currentVisible"
    @closed="handleClosed"
  >
    <template #body>
      <NForm
        ref="nFormRef"
        :schema="schema"
        :form-options="Object.assign({ labelSuffix: ':' }, formOptions)"
      ></NForm>
    </template>
    <template #footer>
      <slot name="footer">
        <el-button type="" @click="currentVisible = false">{{
          cancelBtnText
        }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{
          confirmBtnText
        }}</el-button>
      </slot>
    </template>
  </NDialog>
</template>

<style lang="scss">
.model-form-px-20 {
  padding: 0px 20px;
}
</style>
<script lang="ts">
export default {
  name: 'NModelForm'
}
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { IFormSchema } from './types/options'
import { ElFormType } from './types/elForm'
import cloneDeep from 'lodash/cloneDeep'
import NEditor from '@/components//nEditor/src/index.vue'
// const NEditor = defineAsyncComponent(
//   () => import('@/components//nEditor/src/index.vue')
// )

const props = defineProps({
  schema: {
    type: Array as PropType<IFormSchema[]>,
    required: true
  },
  formOptions: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'submit', payload: any): void
}>()

const formRef = ref<ElFormType | null>(null)
const model = ref<any>({})
const rules = ref<any>({})

const resetFields = () => {
  const schema = cloneDeep(props.schema)
  schema.forEach((item) => {
    model.value[item.prop!] = item.value
  })
  formRef.value?.clearValidate()
}

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid) => {
      resolve(valid)
    })
  })
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  const flag = await validate()
  if (flag) {
    const payload = { model: cloneDeep(model.value), form: formRef.value }
    emit('submit', payload)
  }
}

const handleEditChange = (prop: string, html: string) => {
  model.value[prop] = html
}

const getModel = () => {
  return cloneDeep(model.value)
}

defineExpose({ resetFields, validate, getModel })

onMounted(() => {
  const schema = cloneDeep(props.schema)
  schema.forEach((item) => {
    const prop = item.prop as string
    model.value[prop] = item.value
    rules.value[prop] = item.rules
  })
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="model"
    :validate-on-rule-change="false"
    :rules="rules"
    @submit="handleSubmit"
    v-bind="formOptions"
  >
    <template v-for="(item, index) in schema" :key="index">
      <el-form-item :prop="item.prop" :label="item.label">
        <template v-if="item.type === 'editor'">
          <NEditor
            v-model="model[item.prop!]"
            :placeholder="item.placeholder"
            :custom-upload="(item.editorOptions?.customUpload as any)"
            v-bind="item.editorAttrs"
            @change="(html:string) => handleEditChange(item.prop!, html)"
          ></NEditor>
        </template>
        <template v-else>
          <component
            :is="`el-${item.type}`"
            v-model="model[item.prop!]"
            :placeholder="item.placeholder"
            v-bind="item.attrs"
          >
            <template v-if="item.children && item.children.length">
              <template v-for="(cItem, cIndex) in item.children" :key="cIndex">
                <component :is="`el-${cItem.type}`" v-bind="cItem"> </component>
              </template>
            </template>
          </component>
        </template>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="formRef" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'NForm'
}
</script>

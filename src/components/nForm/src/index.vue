<script setup lang="ts">
import { PropType } from 'vue'
import { IFormSchema } from './types/options'
import { ElFormType } from './types/elForm'

import cloneDeep from 'lodash/cloneDeep'

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

const handleSubmit = (e: Event) => {
  e.preventDefault()
  formRef.value?.validate((valid) => {
    if (valid) {
      const payload = { model: cloneDeep(model.value), form: formRef.value }
      emit('submit', payload)
    }
  })
}

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
  <pre>{{ model }}</pre>
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

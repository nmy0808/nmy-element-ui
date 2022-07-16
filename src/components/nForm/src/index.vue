<script setup lang="ts">
import { PropType } from 'vue'
import { IFormSchema } from './types/options'

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
const model = ref<any>({})
const rules = ref<any>({})
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
    :model="model"
    :validate-on-rule-change="false"
    :rules="rules"
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
  </el-form>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'NForm'
}
</script>

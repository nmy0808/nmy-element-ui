<script setup lang="ts">
import { PropType } from 'vue'
import { ITableOptions } from './types/options'

const props = defineProps({
  options: {
    type: Array as PropType<ITableOptions[]>,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <el-table :data="data">
    <template v-for="(item, index) in options" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      ></el-table-column>
    </template>
  </el-table>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'NTable'
}
</script>

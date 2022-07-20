<script setup lang="ts">
import { NDraggableOptions } from '@/components/nDraggable/src/types'
import Sortable from 'sortablejs'

const list = ref(['张三', '李四', '王五'])
const options: NDraggableOptions = {
  handle: '.move'
}
</script>

<template>
  <div class="">
    <pre>
    {{ list }}
  </pre
    >
    <NDraggable v-model="list" :options="options">
      <el-card
        class="draggle-demo"
        shadow="never"
        v-for="(item, index) in list"
        :key="index"
      >
        <NIcon class="move" icon="menu" :size="12"></NIcon>
        <span>
          {{ item }}
        </span>
      </el-card>
    </NDraggable>
  </div>
</template>

<style scoped lang="scss">
.move {
  margin-right: 12px;
  transform: rotate(45deg);
  cursor: move;
}
.draggle-demo {
  margin-bottom: 10px;
  user-select: none;
}
</style>

<script setup lang="ts">
import { ref, onMounted, PropType, nextTick } from 'vue'
import Sortable from 'sortablejs'

const props = defineProps({
  options: {
    type: Object as PropType<Sortable.Options>,
    default: () => ({})
  },
  modelValue: {
    type: Array,
    required: true,
    default: () => []
  }
})
const emits = defineEmits<{
  (e: 'update:modelValue', arr: any[]): void
}>()
const draggableRef = ref<InstanceType<typeof HTMLDivElement> | null>(null)
const refreshId = ref(1)

const initSortable = () => {
  if (draggableRef.value) {
    Sortable.create(draggableRef.value, {
      animation: 150,
      onEnd: function (evt) {
        const { newIndex, oldIndex } = evt
        const modelValueCopy = [...props.modelValue]
        if (![newIndex, oldIndex].includes(undefined)) {
          const target = modelValueCopy.splice(oldIndex!, 1)[0]
          modelValueCopy.splice(newIndex!, 0, target)
          emits('update:modelValue', modelValueCopy)
          refreshId.value++
          nextTick(() => {
            initSortable()
          })
        }
      },
      ...props.options
    })
  }
}
onMounted(() => {
  initSortable()
})
</script>

<template>
  <div :key="refreshId" ref="draggableRef" class="draggable">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'NDraggable'
}
</script>

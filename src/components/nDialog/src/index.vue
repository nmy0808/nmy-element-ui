<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  dialogOptions: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'update:visible', flag: boolean): void
  (e: 'closed'): void
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

const handleClosed = () => {
  emit('closed')
}
</script>

<template>
  <el-dialog
    destroy-on-close
    v-bind="dialogOptions"
    @closed="handleClosed"
    v-model="currentVisible"
  >
    <el-scrollbar height="64vh">
      <slot name="body"></slot>
    </el-scrollbar>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'NDialog'
}
</script>

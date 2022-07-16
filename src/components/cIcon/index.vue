<script setup lang="ts">
interface IProp {
  icon: string
}
const props = defineProps<IProp>()
</script>

<template>
  <div class="c-icon">
    <el-icon v-bind="$attrs">
      <component :is="icon"></component>
    </el-icon>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'CIcon'
}
</script>

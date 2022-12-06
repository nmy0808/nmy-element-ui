<script setup lang="ts">
interface IProp {
  icon: string
}
const props = defineProps<IProp>()
</script>

<template>
  <div class="n-icon">
    <el-icon v-bind="$attrs">
      <component :is="icon"></component>
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.n-icon {
  display: inline-block;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
<script lang="ts">
export default {
  name: 'NIcon'
}
</script>

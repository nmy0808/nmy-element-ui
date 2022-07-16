<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const visible = ref(false)
const search = ref('')
const keys = Object.keys(ElementPlusIconsVue)
const keysCalc = computed(() =>
  keys.filter((it) =>
    it.toLowerCase().trim().includes(search.value.toLowerCase().trim())
  )
)
const handleClose = () => {
  search.value = ''
}
</script>

<template>
  <div class="icon-choose">
    <el-button type="primary" @click="visible = true">选择图标</el-button>
    <ElDialog
      title="选择图标"
      v-model="visible"
      @close="handleClose"
      top="4vh"
      destroy-on-close
    >
      <el-input v-model="search"></el-input>
      <el-scrollbar height="70vh">
        <div class="flex flex-wrap justify-between">
          <template v-for="(item, index) in keysCalc" :key="index">
            <div
              v-copy="item"
              class="flex items-center justify-center flex-col w-40 h-26 hover:text-blue-500 cursor-pointer duration-200"
            >
              <div class="flex justify-center">
                <CIcon :icon="item" :size="28"></CIcon>
              </div>
              <div>{{ item }}</div>
            </div>
          </template>
          <div
            v-for="(item, index) in 8"
            :key="index"
            class="flex items-center justify-center flex-col w-40"
          ></div>
        </div>
      </el-scrollbar>
    </ElDialog>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'IconChoose'
}
</script>

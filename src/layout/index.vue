<script setup lang="ts">
import Slider from '@/components/slider/index'
import NIcon from '@/components/cIcon/index.vue'
const route = useRoute()
const collapse = ref(false)
const defaultActive = computed(() => route.fullPath.slice(1))
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto" class="h-screen">
        <slider
          class="h-full"
          :data="route.matched[0].children"
          :options="{
            collapse,
            router: true,
            defaultActive,
            uniqueOpened: true
          }"
        ></slider>
      </el-aside>
      <el-container class="h-screen">
        <el-header class="h-70px">
          <NIcon
            class="cursor-pointer"
            icon="expand"
            :size="22"
            v-if="collapse"
            @click="collapse = false"
          ></NIcon>
          <NIcon
            class="cursor-pointer"
            icon="fold"
            :size="22"
            v-else
            @click="collapse = true"
          ></NIcon>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped lang="scss"></style>

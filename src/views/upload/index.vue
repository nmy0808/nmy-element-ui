<script setup lang="ts">
const handleCustomUpload = (file: any) => {
  console.log(file)
  return 'https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
}
</script>

<template>
  <NUpload :custom-upload="handleCustomUpload"></NUpload>
</template>

<style scoped lang="scss"></style>

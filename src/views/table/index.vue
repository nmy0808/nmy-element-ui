<script setup lang="ts">
import { ITableOptions } from '@/components/nTable/src/types/options'

const data = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
const options = ref<ITableOptions[]>([
  {
    label: '姓名',
    prop: 'name',
    width: '200px',
    align: 'center'
  },
  {
    label: '地址',
    prop: 'address',
    width: '',
    align: 'center'
  },
  {
    label: '时间',
    prop: 'date',
    width: '',
    align: 'center'
  }
])
</script>

<template>
  <div class="">
    <NTable :data="data" :options="options"></NTable>
  </div>
</template>

<style scoped lang="scss"></style>

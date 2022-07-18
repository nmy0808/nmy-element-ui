<script setup lang="ts">
import { ITableOptions } from '@/components/nTable/src/types/options'
import NTable from '@/components/nTable/src/index.vue'
const data = ref([
  {
    date: '2016-05-03',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
const options = ref<ITableOptions[]>([
  {
    label: '姓名',
    prop: 'name',
    width: '200px',
    align: 'center',
    editable: true,
    editSlot: 'edit_name'
  },
  {
    label: '地址',
    prop: 'address',
    width: '',
    align: 'center',
    editable: true
  },
  {
    label: '时间',
    prop: 'date',
    width: '',
    align: 'center',
    slot: 'date'
  }
  // {
  //   label: '操作',
  //   width: '',
  //   align: 'center',
  //   slot: 'action'
  // }
])
const tableRef = ref<InstanceType<typeof NTable> | null>(null)
const handleActiveRow = () => {
  tableRef.value?.activeRowEditByIndex(1)
}
const handleCancelActiveRow = () => {
  tableRef.value?.cancelRowEdit()
}

const handleConfirm = (data: any) => {
  console.log(data)
}
const handleEditRow = (index: number) => {
  tableRef.value?.activeRowEditByIndex(index)
}
</script>

<template>
  <div class="">
    <el-button type="primary" @click="handleActiveRow">激活</el-button>
    <el-button type="primary" @click="handleCancelActiveRow"
      >取消激活</el-button
    >
    <NTable
      ref="tableRef"
      :data="data"
      :options="options"
      @confirm="handleConfirm"
    >
      <template #date="{ $index }"> {{ $index }} </template>
      <template #edit_name="{ row }">
        <el-input v-model="row['name']"></el-input>
      </template>
      <template #action="{ $index }">
        <el-button type="primary" @click="handleEditRow($index)"
          >编辑</el-button
        >
        <el-button type="danger">删除</el-button>
      </template>
    </NTable>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<style scoped lang="scss"></style>

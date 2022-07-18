<script setup lang="ts">
import { ITableOptions } from '@/components/nTable/src/types/options'
import NTable from '@/components/nTable/src/index.vue'
import { ElForm } from 'element-plus'
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
    label: '#',
    prop: '1',
    type: 'expand',
    slot: 'expand'
  },
  {
    label: '#',
    prop: 'index',
    type: 'selection',
    width: '200px',
    align: 'center'
  },
  {
    label: '#',
    prop: 'index',
    type: 'index',
    width: '200px',
    align: 'center'
  },
  {
    label: '姓名',
    prop: 'name',
    width: '200px',
    align: 'center',
    editable: true,
    editSlot: 'edit_name',
    rules: [{ required: true, message: 'name~~', trigger: ['change', 'blur'] }]
  },
  {
    label: '地址',
    prop: 'address',
    width: '',
    align: 'center',
    editable: true,
    rules: [
      { required: true, message: 'required ~~', trigger: ['change', 'blur'] },
      { min: 2, max: 6, message: '2 ~ 6', trigger: ['change', 'blur'] }
    ]
  },
  {
    label: '时间',
    prop: 'date',
    width: '',
    align: 'center',
    parse: (scope: any) => {
      return scope.row.date
    }
  }
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

const name = ref('')

const params = ref({
  name: ''
})
const demoFormRef = ref<InstanceType<typeof ElForm> | null>(null)

const demoReset = () => {
  demoFormRef.value?.resetFields()
}
const demoRules = {
  name: [{ required: true, message: 'name~~', trigger: ['change', 'blur'] }]
}
const nameRules = [
  { required: true, message: 'name~~', trigger: ['change', 'blur'] }
]
const selectionChange = (rows: any) => {
  console.log(rows)
}
const handleDragSort = (data: any[]) => {
  console.log(data)
}
</script>

<template>
  <div class="">
    <el-button type="primary" @click="handleActiveRow">激活某一行</el-button>
    <el-button type="primary" @click="handleCancelActiveRow"
      >取消激活</el-button
    >
    <NTable
      border
      ref="tableRef"
      :data="data"
      :options="options"
      @confirm="handleConfirm"
      @selection-change="selectionChange"
      @drag-sort="handleDragSort"
    >
      <template #expand> 123123 </template>
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

    <!-- <pre>
      {{ data }}
    </pre> -->

    <!-- <el-form ref="demoFormRef" :model="params">
      <el-form-item label="name" prop="name" :rules="nameRules">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="demoReset">重置</el-button> -->
  </div>
</template>

<style scoped lang="scss"></style>

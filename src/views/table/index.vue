<script setup lang="ts">
import { ITableOptions } from '@/components/nTable/src/types/options'
import NTable from '@/components/nTable/src/index.vue'
const data = ref([
  {
    date: 1795403471000,
    name: 'Jack',
    age: 18,
    sex: 1
  },
  {
    date: 1795403471000,
    name: 'Tom',
    age: 19,
    sex: 0
  },
  {
    date: 1795403471000,
    name: 'Lucy',
    age: 20,
    sex: 1
  },
  {
    date: 1795403471000,
    name: 'Haney',
    age: 21,
    sex: 1
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
    width: '60px',
    align: 'center'
  },
  {
    label: '#',
    prop: 'index',
    type: 'index',
    width: '60px',
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
    label: '年龄',
    prop: 'age',
    width: '180px',
    align: 'center',
    editable: true,
    editSlot: 'edit_age',
    rules: [
      { required: true, message: 'age~~', trigger: ['change', 'blur'] },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (value < 18) {
            return callback(new Error('年龄不能低于18岁~'))
          }
          callback()
        },
        trigger: ['change', 'blur']
      }
    ]
  },
  {
    label: '性别',
    prop: 'sex',
    width: '180px',
    align: 'center',
    editable: true,
    editSlot: 'edit_sex',
    parse: ({ row }: any) => {
      const value = row['sex']
      return value ? '男' : '女'
    },
    rules: [{ required: true, message: 'name~~', trigger: ['change', 'blur'] }]
  },
  {
    label: '时间',
    prop: 'date',
    width: '300px',
    align: 'center',
    editable: true,
    editSlot: 'edit_date',
    parse: (scope: any) => {
      const date = new Date(scope.row.date)
      return date.toLocaleString()
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
const handleResetFields = () => {
  tableRef.value?.resetFields()
}
const handleConfirm = (data: any) => {
  console.log(data)
}

const handleEditRow = (index: number) => {
  tableRef.value?.activeRowEditByIndex(index)
}

const selectionChange = (rows: any) => {
  console.log(rows)
}
const handleDragSort = (sortData: any[]) => {
  // 1.请求排序
  // 2.赋值最终排序
  data.value = sortData
}
</script>

<template>
  <div class="">
    <el-button type="primary" @click="handleActiveRow">编辑某行</el-button>
    <el-button type="primary" @click="handleCancelActiveRow"
      >取消编辑</el-button
    >
    <el-button type="primary" @click="handleResetFields">重置数据</el-button>
    <NTable
      border
      ref="tableRef"
      :data="data"
      :options="options"
      @confirm="handleConfirm"
      @selection-change="selectionChange"
      @drag-sort="handleDragSort"
    >
      <template #expand> expand内容... </template>
      <template #date="{ $index }"> {{ $index }} </template>
      <template #edit_name="{ row }">
        <el-input size="small" v-model="row['name']"></el-input>
      </template>
      <template #edit_age="{ row }">
        <el-input-number size="small" v-model="row['age']"></el-input-number>
      </template>
      <template #edit_sex="{ row }">
        <el-select size="small" v-model="row['sex']" placeholder="请选择">
          <el-option label="女" :value="0"> </el-option>
          <el-option label="男" :value="1"> </el-option>
        </el-select>
      </template>
      <template #edit_date="{ row }">
        <el-date-picker
          v-model="row['date']"
          type="datetime"
          value-format="x"
          placeholder="Select date and time"
        />
      </template>
      <template #action="{ $index }">
        <el-button type="primary" @click="handleEditRow($index)"
          >编辑</el-button
        >
        <el-button type="danger">删除</el-button>
        <el-button type="">按钮</el-button>
        <el-button type="">按钮</el-button>
      </template>
    </NTable>
  </div>
</template>

<style scoped lang="scss"></style>

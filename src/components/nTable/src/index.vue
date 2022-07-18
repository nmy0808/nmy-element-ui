<script setup lang="ts">
import { PropType } from 'vue'
import { ITableOptions } from './types/options'
import NIcon from '@/components/cIcon/index.vue'
import { ElFormType } from '@/components/nForm/src/types/elForm'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  options: {
    type: Array as PropType<ITableOptions[]>,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'confirm', payload: any): void
}>()

const dataClone = ref<any[]>([])

watch(
  props.data,
  () => {
    dataClone.value = cloneDeep(props.data)
  },
  { deep: true, immediate: true }
)

const formRef = ref<ElFormType | null>(null)

const reset = () => {
  formRef.value?.resetFields()
}
// 行: 当前激活编辑的行的索引 $index
const activeRowIndex = ref(-1)

// 单元格:当前激活编辑的单元格的唯一id  ( $index + column.id )
const activeColEditId = ref(-1)

// 行: 根据行索引激活当前行的编辑状态
const activeRowEditByIndex = (index: number) => {
  // 先恢复初始data数据
  dataClone.value = cloneDeep(props.data)
  activeColEditId.value = -1
  activeRowIndex.value = index
}
// 行: 清空当前的行编辑状态
const clearRowEdit = () => {
  activeRowIndex.value = -1
}

// 单元格: 点击单元格编辑
const handleActiveEdit = (scope: any) => {
  // 先恢复初始data数据
  dataClone.value = cloneDeep(props.data)
  activeRowIndex.value = -1
  activeColEditId.value = scope.$index + scope.column.id
}

// 单元格: 点击单元格确认编辑
const handleConfirm = (scope: any) => {
  activeColEditId.value = -1
  activeRowIndex.value = -1
  const index = scope.$index
  const row = cloneDeep(scope.row)
  const oldRow = cloneDeep(props.data[index])
  const payload = {
    row,
    oldRow,
    index,
    data: cloneDeep(dataClone.value)
  }
  emit('confirm', payload)
  return payload
}

// 行 和 单元格: 点击取消编辑
const handleCancel = () => {
  activeColEditId.value = -1
  activeRowIndex.value = -1
  // 恢复初始data数据
  dataClone.value = cloneDeep(props.data)
}
// 行: 确定当前行编辑
const confirmRowEdit = () => {
  const $index = activeRowIndex.value
  const scope = { $index, row: dataClone.value[$index] }
  return handleConfirm(scope)
}

//
const handleRowClick = (row: any, column: any) => {
  console.log(row)
  console.log(column)
}

defineExpose({
  activeRowEditByIndex,
  confirmRowEdit,
  cancelRowEdit: handleCancel
})
</script>

<template>
  <el-table
    :data="dataClone"
    :rules="{ name: [{ required: true, trigger: 'change' }] }"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-table-column
        :label="item.label"
        :width="item.width"
        :align="item.align"
      >
        <template #default="scope">
          <!--
          判断激活编辑:
            注意: 必须当前行配置了字段 editable = true
              1.当前列id,
              2.当前行索引
        -->
          <template
            v-if="
              item.editable &&
              (activeColEditId === scope.$index + scope.column.id ||
                activeRowIndex === scope.$index)
            "
          >
            <slot
              v-if="item.editSlot"
              :name="item.editSlot"
              :row="scope.row"
              :$index="scope.$index"
              :$column="scope.column"
              :$store="scope.store"
            ></slot>
            <!-- 注意: 如果没有配置开启编辑状态的表单插槽, 默认为输入框表单组件 -->
            <el-input v-else v-model="scope.row[item.prop!]"></el-input>
            <!-- 当前如果是激活行编辑, 列编辑操作图标不会显示 -->
            <template v-if="activeRowIndex === -1">
              <NIcon
                icon="check"
                @click.stop="handleConfirm(scope)"
                class="icon-edit"
              ></NIcon>
              <NIcon
                icon="close"
                @click.stop="handleCancel"
                class="icon-edit"
              ></NIcon>
            </template>
          </template>
          <!-- 当前没有开启编辑的状态 -->
          <template v-else>
            <!-- 有slot -->
            <slot
              v-if="item.slot"
              :name="item.slot"
              :row="scope.row"
              :$index="scope.$index"
              :column="scope.column"
              :store="scope.store"
            ></slot>
            <!--  普通, 没有slot -->
            <span v-else>{{ scope.row[item.prop!] }}</span>
            <!--  编辑按钮 -->
            <NIcon
              v-if="item.editable"
              icon="edit"
              @click.stop="handleActiveEdit(scope)"
              class="icon-edit"
            ></NIcon>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column>
      <template #default="scope">
        <!-- 如果当前开启了行编辑, 当前行显示 取消保存 按钮 -->
        <template v-if="activeRowIndex === scope.$index">
          <el-button type="" @click="handleCancel">取消</el-button>
          <el-button type="success" @click="confirmRowEdit">保存</el-button>
        </template>
        <!-- 否则显示用户配置action插槽 -->
        <slot
          v-else
          name="action"
          :row="scope.row"
          :$index="scope.$index"
          :$column="scope.column"
          :$store="scope.store"
        ></slot>
      </template>
    </el-table-column>
    <!--  -->
  </el-table>
  <el-button type="primary" @click="reset">reset</el-button>
</template>

<style scoped lang="scss">
.icon-edit {
  cursor: pointer;
}
</style>
<script lang="ts">
export default {
  name: 'NTable'
}
</script>

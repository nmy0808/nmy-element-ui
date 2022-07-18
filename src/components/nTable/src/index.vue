<script setup lang="ts">
import { PropType } from 'vue'
import { ITableOptions } from './types/options'
import NIcon from '@/components/cIcon/index.vue'
import { ElFormType } from '@/components/nForm/src/types/elForm'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { ElTable } from 'element-plus'
const props = defineProps({
  options: {
    type: Array as PropType<ITableOptions[]>,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  // 单独配置表格操作项
  actionTableColumnOptions: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'confirm', payload: any): void
  (e: 'selectionChange', payload: any[]): void
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
const handleConfirm = async (scope: any) => {
  await validate()
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
  const flag = isEqual(row, oldRow)
  // 只有修改了数据, 才会触发事件
  if (!flag) {
    emit('confirm', payload)
    return payload
  } else {
    return null
  }
}

// 行 和 单元格: 点击取消编辑
const handleCancel = () => {
  activeColEditId.value = -1
  activeRowIndex.value = -1
  // 恢复初始data数据
  dataClone.value = cloneDeep(props.data)
}
// 行: 确定当前行编辑
const confirmRowEdit = async () => {
  await validate()
  const $index = activeRowIndex.value
  const row = dataClone.value[$index]
  const scope = { $index, row }
  return handleConfirm(scope)
}

//
const handleRowClick = (row: any, column: any) => {
  console.log(row)
  console.log(column)
}

const tableRef = ref<InstanceType<typeof ElTable> | null>(null)

// 选中的row
// const multipleSelection = ref<any[]>([])
// 监听 多选选中
const handleSelectionChange = (selection: any[]) => {
  emit('selectionChange', cloneDeep([...selection]))
}
// 设置选中row
// const toggleRowSelection = (rows: any[], flag = true) => {
//   rows.forEach((row) => {
//     // 如果不填第二个参数, 会切换选中状态
//     tableRef.value?.toggleRowSelection(row, flag)
//   })
// }

// 清空选中状态
const clearSelection = () => {
  tableRef.value?.clearSelection()
}

// 验证当前行
function validate() {
  let formRefList = []
  const promiseList: Promise<any>[] = []
  if (Array.isArray(formRef.value)) {
    formRefList = formRef.value
  } else {
    formRef.value && formRefList.push(formRef.value)
  }
  formRefList.forEach((formRef) => {
    const promise = new Promise((resolve, reject) => {
      ;(formRef as ElFormType).validate((valid) => {
        if (valid) {
          resolve(valid)
        } else {
          reject(valid)
        }
      })
    })
    promiseList.push(promise)
  })
  return new Promise((resolve, reject) => {
    Promise.all(promiseList).then((_) => {
      resolve(true)
    })
  })
}
defineExpose({
  activeRowEditByIndex, // 根据索引激活行编辑
  confirmRowEdit, // 确认当前行编辑
  cancelRowEdit: handleCancel, // 取消行编辑激活状态
  clearSelection // 清空多选选中
})
</script>

<template>
  <el-table
    :data="dataClone"
    ref="tableRef"
    @selection-change="handleSelectionChange"
  >
    <template v-for="(item, index) in options" :key="index">
      <!-- 判断 配置了type属性 -->
      <el-table-column
        v-if="item.type === 'expand'"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :type="item.type"
      >
        <template #default="scope">
          <slot
            :name="item.slot"
            :row="scope.row"
            :$index="scope.$index"
            :column="scope.column"
            :store="scope.store"
          ></slot>
        </template>
      </el-table-column>
      <!-- 判断 配置了type属性 -->
      <el-table-column
        v-else-if="item.type === 'index' || item.type === 'selection'"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :type="item.type"
      ></el-table-column>
      <!-- 判断 没有配置type属性 -->
      <el-table-column
        v-else
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
            <el-form :model="dataClone[scope.$index]" ref="formRef">
              <el-form-item :prop="item.prop" :rules="item.rules as any || []">
                <div class="col-edit-box">
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
                      :size="18"
                      color="green"
                      class="icon"
                    ></NIcon>
                    <NIcon
                      icon="close"
                      @click.stop="handleCancel"
                      :size="18"
                      color="red"
                      class="icon"
                    ></NIcon>
                  </template>
                </div>
              </el-form-item>
            </el-form>
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
              class="icon-edit icon"
              icon="edit"
              :size="18"
              color="#409eff"
              @click.stop="handleActiveEdit(scope)"
            ></NIcon>
          </template>
        </template>
      </el-table-column>
    </template>
    <!-- 按钮 -->
    <el-table-column v-bind="actionTableColumnOptions">
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
.col-edit-box {
  display: flex;
  align-items: center;
}
.icon {
  cursor: pointer;
  position: relative;
  top: 4px;
  margin-left: 6px;
}
</style>
<script lang="ts">
export default {
  name: 'NTable'
}
</script>

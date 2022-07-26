<script setup lang="ts">
import { ref, watch, computed, PropType } from 'vue'
import { ElFormType } from '@/components/nForm/src/types/elForm'
import { ITableOptions } from './types/options'
import { ElTable } from 'element-plus'
// import NIcon from '../../src/components/nIcon/src/index.vue'
import NIcon from '../../nIcon/src/index.vue'
import cloneDeep from 'lodash/cloneDeep'
import useDrop from './hooks/useDrop'
import useSelection from './hooks/useSelection'
import useForm from './hooks/useForm'
import useEdit from './hooks/useEdit'
import usePage from './hooks/usePage'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
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
  },
  // 开启排序
  dragSort: {
    type: Boolean,
    default: true
  },
  // 显示分页 , 另外total小于pageSize不会显示分页
  showPage: {
    type: Boolean,
    default: true
  },
  // 分页水平布局
  pageAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right'
  },
  // 当前页
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  pageLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30]
  },
  // 获取列表数据 用于分页
  getData: {
    type: Function,
    default: null
  }
})

const emit = defineEmits<{
  (e: 'confirm', payload: any): void
  (e: 'selectionChange', payload: any[]): void
  (e: 'update:pagesize', pagesize: number): void
  (e: 'update:currentPage', currentPage: number): void
  (e: 'dragSort', data: any[]): void
}>()

const dataClone = ref<any[]>([])

const formRef = ref<ElFormType | null>(null)

// 计算当前分页对齐方向
const pageAlignCalc = computed(() => {
  if (props.pageAlign === 'left') {
    return 'flex-start'
  } else if (props.pageAlign === 'right') {
    return 'flex-end'
  }
  return 'center'
})

const tableRef = ref<InstanceType<typeof ElTable> | null>(null)

// 验证逻辑
const { validate } = useForm({ formRef })

// 开启行/单元格编辑 逻辑
const {
  activeRowIndex,
  activeColEditId,
  activeRowEditByIndex,
  handleActiveEdit,
  handleConfirm,
  handleCancel,
  confirmRowEdit,
  resetFields
} = useEdit({ dataClone, props, validate, emit })

// 拖拽逻辑
const { refreshKey } = useDrop({ props, tableRef, emit, dataClone })

// 多选逻辑
const { handleSelectionChange, clearSelection } = useSelection({
  tableRef,
  emit
})

// 分页逻辑
const { handleSizeChange, handleCurrentChange } = usePage({ props, emit })

watch(
  () => props.data,
  () => {
    refreshKey.value++
    dataClone.value = cloneDeep(props.data)
  },
  { deep: true, immediate: true }
)
defineExpose({
  activeRowEditByIndex, // 根据索引激活行编辑
  confirmRowEdit, // 确认当前行编辑
  cancelRowEdit: handleCancel, // 取消行编辑激活状态
  resetFields, // 重置数据
  clearSelection // 清空多选选中
})
</script>

<template>
  <el-table
    v-loading="loading"
    :key="refreshKey"
    :data="dataClone"
    ref="tableRef"
    v-bind="$attrs"
    @selection-change="handleSelectionChange"
  >
    <!-- 开启排序 -->
    <el-table-column v-if="dragSort" label="" width="40px" align="center">
      <template #default>
        <NIcon icon="Menu" :size="12" color="#409eff" class="move"></NIcon>
      </template>
    </el-table-column>
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
                  <div v-if="item.editSlot" class="flex-1">
                    <slot
                      :name="item.editSlot"
                      :row="scope.row"
                      :$index="scope.$index"
                      :$column="scope.column"
                      :$store="scope.store"
                    ></slot>
                  </div>
                  <!-- 注意: 如果没有配置开启编辑状态的表单插槽, 默认为输入框表单组件 -->
                  <el-input v-else v-model="scope.row[item.prop!]"></el-input>
                  <!-- 当前如果是激活行编辑, 列编辑操作图标不会显示 -->
                  <template v-if="activeRowIndex === -1">
                    <div class="edit-icon-wrap">
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
                    </div>
                  </template>
                </div>
              </el-form-item>
            </el-form>
          </template>
          <!-- 当前没有开启编辑的状态 -->
          <template v-else>
            <div
              class="flex items-center"
              :class="{ 'justify-center': item.align }"
            >
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
              <span v-else>{{
                item.parse ? item.parse({ ...scope }) : scope.row[item.prop!]
              }}</span>
              <!--  编辑按钮 -->
              <NIcon
                v-if="item.editable"
                class="icon-edit icon"
                icon="edit"
                :size="18"
                color="#409eff"
                @click.stop="handleActiveEdit(scope)"
              ></NIcon>
            </div>
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
          :column="scope.column"
          :store="scope.store"
        ></slot>
      </template>
    </el-table-column>
    <!--  -->
  </el-table>
  <div class="page-box" :style="{ justifyContent: pageAlignCalc }">
    <el-pagination
      v-if="showPage && total > pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="pageLayout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<style scoped lang="scss">
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.flex-1 {
  flex: 1 1 0%;
}
.col-edit-box {
  display: flex;
  align-items: center;
}
.icon {
  cursor: pointer;
  position: relative;
  margin-left: 6px;
}
.move {
  cursor: move;
  transform: rotate(45deg);
}
.page-box {
  display: flex;
  margin-top: 1em;
}
.el-form-item {
  margin-top: 18px;
}
.noedit-wrap {
  width: 80%;
}
.icon-edit {
  margin-right: 0;
}
.edit-icon-wrap {
  width: 50px;
  display: flex;
  align-items: center;
  margin-left: 6px;
}
</style>
<script lang="ts">
export default {
  name: 'NTable'
}
</script>

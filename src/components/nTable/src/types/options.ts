export interface ITableOptions {
  label: string
  prop?: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  slot?: string
  editable?: boolean // 当前单元格是否支持编辑
  editSlot?: string // 当前单元格表单编辑插槽
}

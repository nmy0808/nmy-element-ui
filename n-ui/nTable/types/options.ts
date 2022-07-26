import { RuleItem } from './rules'

export interface ITableOptions {
  label: string
  prop: string
  type?: 'selection' | 'index' | 'expand'
  width?: string | number
  align?: 'left' | 'center' | 'right'
  slot?: string
  parse?: Function
  editable?: boolean // 当前单元格是否支持编辑
  editSlot?: string // 当前单元格表单编辑插槽
  rules?: RuleItem[] // 开启单元格编辑验证
}

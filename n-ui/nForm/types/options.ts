import { customUploadType } from '../../nEditor/types/customUpload'
import { CSSProperties } from 'vue'
import { RuleItem } from './rules'

export interface IFormSchema {
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'date-picker'
    | 'input'
    | 'radio'
    | 'radio-group'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  value: any
  label?: string
  placeholder?: string
  prop?: string
  rules?: RuleItem[] // trigger  是我添加的, 源码没有
  attrs?: {
    style?: CSSProperties
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
  }
  editorAttrs?: {
    height: number
  }
  editorOptions?: {
    customUpload: customUploadType
  }
  customUpload?: (file: File) => Promise<string> // 自定义上传, 返回url字符串
  children?: IFormSchema[]
}

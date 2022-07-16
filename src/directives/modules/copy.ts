import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
let handle: any

export const copy = {
  mounted(el: HTMLDivElement, { value }: { value: string }) {
    handle = () => {
      const input = document.createElement('input')
      input.value = value
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      ElMessage({
        type: 'success',
        message: '复制成功',
        duration: 1500
      })
    }
    el.addEventListener('click', handle)
  },
  beforeUnmount(el: HTMLDivElement) {
    el.removeEventListener('click', handle)
  }
}

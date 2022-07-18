import { ElFormType } from '@/components/nForm/src/types/elForm'

export default function ({ props, emit }: any) {
  const handleSizeChange = (value: number) => {
    emit('update:pagesize', value)
    props.getData && props.getData()
  }
  const handleCurrentChange = (value: number) => {
    emit('update:currentPage', value)
    props.getData && props.getData()
  }
  return {
    handleSizeChange,
    handleCurrentChange
  }
}

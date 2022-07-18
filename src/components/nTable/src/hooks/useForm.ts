import { ElFormType } from '@/components/nForm/src/types/elForm'

export default function ({ formRef }: any) {
  // 验证当前行
  function validate() {
    let formRefList = []
    const promiseList: Promise<any>[] = []
    if (Array.isArray(formRef.value)) {
      formRefList = formRef.value
    } else {
      formRef.value && formRefList.push(formRef.value)
    }
    formRefList.forEach((formRef: any) => {
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
  return {
    validate
  }
}

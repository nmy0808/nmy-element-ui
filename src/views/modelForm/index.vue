<script setup lang="ts">
import { IFormSchema } from '@/components/nForm/src/types/options'
import NModelForm from '@/components/nModelForm/src/index.vue'

const visible = ref(false)
const schema = ref<IFormSchema[]>([
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    value: '',
    attrs: {
      clearable: true
    },
    rules: [
      {
        trigger: 'blur',
        required: true,
        message: '请填写用户名'
      },
      {
        trigger: 'blur',
        min: 6,
        max: 8,
        message: '用户名6~8位'
      }
    ]
  },
  {
    type: 'input',
    label: '密码',
    prop: 'password',
    value: '',
    attrs: {
      clearable: true,
      showPassword: true
    },
    rules: [
      {
        trigger: 'blur',
        required: true,
        message: '请填写密码'
      },
      {
        trigger: 'blur',
        min: 6,
        max: 8,
        message: '密码6~8位'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    label: '爱好',
    prop: 'like',
    children: [
      {
        type: 'checkbox',
        value: 1,
        label: '篮球'
      },
      {
        type: 'checkbox',
        value: 2,
        label: '足球'
      },
      {
        type: 'checkbox',
        value: 3,
        label: '乒乓球'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '男',
    label: '性别',
    prop: 'gender',
    children: [
      {
        type: 'radio',
        value: 'male',
        label: '男'
      },
      {
        type: 'radio',
        value: 'female',
        label: '女'
      },
      {
        type: 'radio',
        value: 3,
        label: '不详'
      }
    ]
  },
  {
    type: 'select',
    value: '',
    label: '工作',
    prop: 'work',
    placeholder: '请选择职位',
    children: [
      {
        type: 'option',
        value: 0,
        label: '教师'
      },
      {
        type: 'option',
        value: 1,
        label: '程序员'
      }
    ]
  },
  {
    type: 'editor',
    value: '13',
    label: '描述',
    prop: 'desc',
    placeholder: '请填写描述',
    editorAttrs: {
      height: 300
    },
    editorOptions: {
      customUpload: (file, insertFn) => {
        const formData = new FormData()
        formData.append('file', file)
        fetch('http://127.0.0.1:8888/api/upload', {
          method: 'POST',
          body: formData
        })
          .then((res) => {
            return res.json()
          })
          .then((res) => {
            insertFn(`${res.data}`, '', '')
          })
      }
    },
    rules: [
      {
        trigger: 'blur',
        required: true,
        message: '请填写描述'
      }
    ]
  },
  {
    type: 'editor',
    value: '21',
    label: '描述2',
    prop: 'desc2',
    placeholder: '请填写描述',
    editorAttrs: {
      height: 300
    },
    editorOptions: {
      customUpload: (file: any, insertFn: any) => {
        const formData = new FormData()
        formData.append('file', file)
        fetch('http://127.0.0.1:8888/api/upload', {
          method: 'POST',
          body: formData
        })
          .then((res) => {
            return res.json()
          })
          .then((res) => {
            insertFn(`${res.data}`, '', '')
          })
      }
    },
    rules: [
      {
        trigger: 'blur',
        required: true,
        message: '请填写描述'
      }
    ]
  }
])

const modelFormRef = ref<InstanceType<typeof NModelForm> | null>(null)
// modelForm提供 confirm 事件
const handleConfirm = (model: any) => {
  console.log(model)
}
// 手动触发验证, 获取model
const handleConfirm2 = async () => {
  const flag = await modelFormRef.value?.validate()
  if (flag) {
    const model = modelFormRef.value?.getModel()
    console.log(model)
  }
}
</script>

<template>
  <div class="">
    <el-button type="primary" @click="visible = true">打开</el-button>
    <NModelForm
      ref="modelFormRef"
      title="编辑"
      :form-options="{ labelWidth: 100 }"
      v-model:visible="visible"
      :schema="schema"
      @confirm="handleConfirm"
    >
      <!-- <template #footer>
        <el-button type="" @click="modelFormRef?.resetFields()">重置</el-button>
        <el-button type="primary" @click="handleConfirm2">确定</el-button>
      </template> -->
    </NModelForm>
  </div>
</template>

<style scoped lang="scss"></style>

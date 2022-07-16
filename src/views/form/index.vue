<script setup lang="ts">
import { IActionScope } from '@/components/nForm/src/types/actionScope'
import { IFormSchema } from '@/components/nForm/src/types/options'

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
    rules: [
      {
        trigger: 'blur',
        required: true,
        message: '请填写描述'
      }
    ]
  }
])
const formOptions = {
  labelWidth: '200px'
}
const nFormRef = ref(null)
const handleSubmit = async ({ form, model }: IActionScope) => {
  const flag = (await (nFormRef.value as any).validate()) as boolean
  if (flag) {
    console.log(model)
  }
}
const handleReset = (form: IActionScope['form']) => {
  ;(nFormRef.value as any).resetFields()
}
</script>

<template>
  <div class="">
    <NForm
      ref="nFormRef"
      :schema="schema"
      :form-options="formOptions"
      @submit="handleSubmit"
    >
      <template #action="scope">
        <el-button type="" @click="handleReset(scope.form)">重置</el-button>
        <el-button type="primary" @click="handleSubmit(scope)">提交</el-button>
      </template>
    </NForm>
  </div>
</template>

<style scoped lang="scss"></style>

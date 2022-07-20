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
    type: 'upload',
    value: '',
    label: '图片1',
    prop: 'img1',
    customUpload: async (file: File) => {
      // 1.自定义上传请求
      // 2.返回图片url即可
      return 'https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
  },
  {
    type: 'upload',
    value: '',
    label: '图片2',
    prop: 'img2',
    customUpload: async (file: File) => {
      // 1.自定义上传请求
      // 2.返回图片url即可
      return 'https://images.unsplash.com/photo-1657299156528-2d50a9a6a444?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    }
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
        insertFn(
          'https://images.unsplash.com/photo-1657299156528-2d50a9a6a444?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          '',
          ''
        )
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
      customUpload: (file, insertFn) => {
        insertFn(
          'https://images.unsplash.com/photo-1657299156528-2d50a9a6a444?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          '',
          ''
        )
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
  currentModel.value = model
  jsonVisible.value = true
  console.log(model)
}
const jsonVisible = ref(false)
const currentModel = ref(null)
// 手动触发验证, 获取model
const handleConfirm2 = async () => {
  const flag = await modelFormRef.value?.validate()
  if (flag) {
    const model = modelFormRef.value?.getModel()
    currentModel.value = model
    jsonVisible.value = true
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
    <NDialog v-model:visible="jsonVisible">
      <template #body>
        提交数据:
        <pre>
      {{ currentModel }}
    </pre
        >
      </template>
    </NDialog>
  </div>
</template>

<style scoped lang="scss"></style>

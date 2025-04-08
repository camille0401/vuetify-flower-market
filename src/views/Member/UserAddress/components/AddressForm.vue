<template>
  <v-card>
    <v-card-title class="d-flex align-center bg-primary">
      <span class="text-white">
        {{ formTitle }}
      </span>
      <v-spacer />
      <v-btn icon @click="handleClose" variant="text">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="pa-4">
      <v-form ref="addressFormRef" class="pa-10 pt-0 pb-0">
        <!-- 收件人 -->
        <v-text-field v-model="addressForm.recipient" label="recipient" variant="outlined" :rules="[requiredRule]"
          class="mb-2" bg-color="parimary"></v-text-field>

        <!-- 手机号码 -->
        <v-text-field v-model="addressForm.phone" label="phone" variant="outlined" :rules="[requiredRule, mobileRule]"
          class="mb-2"></v-text-field>

        <v-text-field v-model="addressForm.prefecture" label="prefecture" variant="outlined" :rules="[requiredRule]"
          class="mb-2"></v-text-field>
        <v-text-field v-model="addressForm.city" label="city" variant="outlined" :rules="[requiredRule]"
          class="mb-2"></v-text-field>
        <!-- 省市区三级联动（简化示例） -->
        <!-- <v-row class="mb-2">
          <v-col cols="4">
            <v-select v-model="addressForm.province" :items="provinces" label="省份" variant="outlined"
              :rules="[requiredRule]"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select v-model="addressForm.city" :items="cities" label="城市" variant="outlined"
              :rules="[requiredRule]"></v-select>
          </v-col>
          <v-col cols="4">
            <v-select v-model="addressForm.district" :items="districts" label="区县" variant="outlined"
              :rules="[requiredRule]"></v-select>
          </v-col>
        </v-row> -->
        <!-- 详细地址 -->
        <v-text-field v-model="addressForm.address" label="address" variant="outlined" :rules="[requiredRule]"
          class="mb-2"></v-text-field>
        <!-- 邮编 -->
        <v-text-field v-model="addressForm.postalCode" label="postalCode" variant="outlined"
          :rules="[requiredRule, zipcodeRule]" class="mb-2"></v-text-field>
        <!-- 默认地址开关 -->
        <v-switch v-model="addressForm.isDefault" label="Default Address" color="primary" :true-value="1"
          :false-value="0"></v-switch>
      </v-form>
    </v-card-text>

    <v-card-actions class="pa-4 bg-grey-lighten-4">
      <v-spacer />
      <v-btn @click="handleClose">取消</v-btn>
      <v-btn color="primary" variant="flat" @click="handleSubmit" :loading="loading">
        保存地址
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const props = defineProps({
  initialData: Object
})

const emit = defineEmits(['submit', 'close'])

const loading = ref(false)
const addressFormRef = ref()
// 表单数据
const addressForm = ref({
  address: "",
	city: "",
	id: null,
	isDefault: 0,
	phone: "",
	postalCode: "",
	prefecture: "",
	recipient: ""
})


// 表单标题
const formTitle = computed(() =>
  props.initialData?.id ? '编辑地址' : '新建地址'
)

// 初始化表单数据
watchEffect(() => {
  if (props.initialData) {
    addressForm.value = { ...props.initialData }
  }
})

// 关闭
const handleClose = () => {
  addressFormRef.value.reset()
  emit('close')
}

// 新增的提交逻辑
const handleSubmit = async () => {
  try {
    const { valid } = await addressFormRef.value.validate()
    if (!valid) {
      toast.error('请正确填写表单')
      return
    }

    loading.value = true
    // 触发父组件事件
    emit('submit', addressForm.value)

    addressFormRef.value.reset()
  } catch (error) {
    toast.error(`提交失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

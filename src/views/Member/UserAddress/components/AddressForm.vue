<template>
  <v-card>
    <v-toolbar color="primary" :title="$t(formTitle)" density="compact">
      <v-btn icon @click="handleClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text class="pa-4">
      <v-form ref="addressFormRef" class="pa-10 pt-0 pb-0">
        <!-- 收件人 -->
        <v-text-field v-model="addressForm.recipient" :label="$t('member.address.addDialog.addressForm.recipient')"
          variant="outlined" :rules="[requiredRule]" class="mb-2" bg-color="parimary"></v-text-field>

        <!-- 手机号码 -->
        <v-text-field v-model="addressForm.phone" :label="$t('member.address.addDialog.addressForm.phone')"
          variant="outlined" :rules="[requiredRule, mobileRule]" class="mb-2"></v-text-field>

        <v-text-field v-model="addressForm.prefecture" :label="$t('member.address.addDialog.addressForm.prefecture')"
          variant="outlined" :rules="[requiredRule]" class="mb-2"></v-text-field>
        <v-text-field v-model="addressForm.city" :label="$t('member.address.addDialog.addressForm.city')"
          variant="outlined" :rules="[requiredRule]" class="mb-2"></v-text-field>
        <!-- 详细地址 -->
        <v-text-field v-model="addressForm.address" :label="$t('member.address.addDialog.addressForm.address')"
          variant="outlined" :rules="[requiredRule]" class="mb-2"></v-text-field>
        <!-- 邮编 -->
        <v-text-field v-model="addressForm.postalCode" :label="$t('member.address.addDialog.addressForm.postalCode')"
          variant="outlined" :rules="[requiredRule, zipcodeRule]" class="mb-2"></v-text-field>
        <!-- 默认地址开关 -->
        <v-switch v-model="addressForm.isDefault" :label="$t('member.address.addDialog.addressForm.defaultAddress')"
          color="primary" :true-value="1" :false-value="0"></v-switch>
      </v-form>
    </v-card-text>

    <v-card-actions class="pa-4 bg-grey-lighten-4">
      <v-spacer />
      <v-btn @click="handleClose">{{ $t('member.address.addDialog.common.cancel') }}</v-btn>
      <v-btn color="primary" variant="flat" prepend-icon="mdi-content-save" @click="handleSubmit" :loading="loading">
        {{ $t('member.address.addDialog.common.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
  props.initialData?.id ? 'member.address.addDialog.formTitle.edit' : 'member.address.addDialog.formTitle.create'
)
// 验证规则
const requiredRule = (v) => !!v || t('member.address.addDialog.formRules.required')

const mobileRule = (v) => {
  const pattern = /^1[3-9]\d{9}$/
  return !v || pattern.test(v) || t('member.address.addDialog.formRules.phoneInvalid')
}

const zipcodeRule = (v) => {
  const pattern = /^[1-9]\d{5}$/
  return !v || pattern.test(v) || t('member.address.addDialog.formRules.zipInvalid')
}

const addressRule = (v) => {
  return !v || v.length >= 5 || t('member.address.addDialog.formRules.addInvalid')
}

// 初始化表单数据
watchEffect(() => {
  if (props.initialData) {
    addressForm.value = { ...props.initialData }
  }
})

// 关闭
const handleClose = () => {
  if (!props.initialData?.id) {
    addressFormRef.value.reset()
  }
  emit('close')
}

// 新增的提交逻辑
const handleSubmit = async () => {
  try {
    const { valid } = await addressFormRef.value.validate()
    if (!valid) {
      toast.error(t('member.address.addDialog.common.submitError'))
      return
    }

    loading.value = true
    // 触发父组件事件
    emit('submit', addressForm.value)

    addressFormRef.value.reset()
  } catch (error) {
    toast.error(`${t('member.address.addDialog.common.submitFail')}: ${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

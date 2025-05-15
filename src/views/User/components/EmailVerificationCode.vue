<template>
  <v-row no-gutters class="mb-2">
    <!-- 验证码输入框 -->
    <v-col cols="8" class="pr-2">
      <v-text-field v-model="codeValue" :label="$t('global.register.verificationCode')" :rules="CodeRules"
        density="comfortable" variant="outlined" prepend-inner-icon="mdi-shield-key-outline" dense />
    </v-col>

    <!-- 发送按钮 -->
    <v-col cols="4">
      <v-btn color="primary" :loading="sending" :disabled="countdown > 0" @click="handleSend" block
        style="height: 48px; line-height: 48px;">
        {{ countdown > 0 ? `${countdown}s` : $t('global.register.sendCode') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { sendCodeAPI } from '@/apis/user'

// Props
const props = defineProps({
  email: { type: String, required: true }, // 接收外部邮箱
  type: { type: Number, required: true } //发送验证类型 0 注册 1 忘记密码
})

// Emits
const emit = defineEmits(['update:modelValue'])

// i18n & Toast
const { t } = useI18n()
const toast = useToast()

// 验证码
const codeValue = ref('')
watch(codeValue, val => emit('update:modelValue', val))

// 状态控制
const sending = ref(false)
const countdown = ref(0)
let timer = null

// 校验规则
const CodeRules = ref([
  value => !!value || t('global.register.validation.requiredField')
]);

// 点击发送验证码
const handleSend = async () => {
  if (!props.email || !props.email.includes('@')) {
    toast.error(t('global.register.emailInvalidMessage'))
    return
  }

  sending.value = true

  try {
    await sendCodeAPI({ email: '2964196727@qq.com', isCheck: props.type })
    toast.success(t('global.register.codeSentMessage'))
    countdown.value = 60
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) clearInterval(timer)
    }, 1000)
  } catch (err) {
    toast.error(t('global.register.codeSendFailedMessage'))
  } finally {
    sending.value = false
  }
}
</script>

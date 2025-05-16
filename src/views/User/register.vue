<!-- 注册 -->
<template>
  <FormPanel :title="$t('register.createAccount')" :subTitle="$t('register.welcome')"
    :footTitle="$t('register.alreadyHaveAccount')" :footBtnText="$t('register.toLogin')" @on-foot-btn="toLogin">

    <template #main>
      <v-form ref="registerFormRef" validate-on="blur" @submit.prevent="doRegister">
        <EmailTextField v-model="registerForm" />
        <EmailVerificationCode :email="registerForm.username" v-model="registerForm.code" :type="0" />
        <PasswordTextField v-model="registerForm" :showPassword="showPassword" />
        <PasswordCheckTextField v-model="registerForm" :showPassword="showPassword" />
        <v-checkbox v-model="showPassword" color="primary" :label="$t('register.showPassword')"
          hide-details></v-checkbox>
        <br>
        <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
          {{ $t('register.createAccount') }}
        </v-btn>
      </v-form>
    </template>

  </FormPanel>
</template>

<script setup>
import FormPanel from './components/FormPanel.vue'
import EmailTextField from './components/EmailTextField.vue'
import PasswordTextField from './components/PasswordTextField.vue'
import PasswordCheckTextField from './components/PasswordCheckTextField.vue'
import EmailVerificationCode from './components/EmailVerificationCode.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification"
import { useI18n } from 'vue-i18n' // Import useI18n to access translations
import { useInviteCode } from '@/composables/useInviteCode'


// Initialize i18n
const { t } = useI18n();  // Use `t` for translation

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

// 注册
const loading = ref(false)
const showPassword = ref(false)
const registerFormRef = ref()
const registerForm = ref({
  username: "",
  password: "",
  checkPassword: "",
  code: ""
})

const toLogin = () => {
  router.push("/user/login")
  registerFormRef.value.reset()
}

const doRegister = async () => {
  // 验证表单有效性
  const { valid } = await registerFormRef.value.validate()
  if (!valid) {
    toast.error(t('register.invalidFormMessage'), {
      timeout: 2000
    })
    return;
  }

  const { getInviteCode, clearInviteCode } = useInviteCode()
  loading.value = true;
  const { username, password, code } = registerForm.value
  const nickname = username.split("@")[0]
  const inviteCode = getInviteCode()
  try {
    // 发送注册请求
    await userStore.register({ username, nickname, password, code, inviteCode })

    // 提示用户注册成功
    toast.success(t('register.successMessage'), {
      timeout: 2000
    });

    // 清除邀请码
    clearInviteCode()

    // 跳转到登录页
    router.push("/user/login")

    // 注册成功后清空表单
    registerFormRef.value.reset()

  } catch (error) {
    // 捕获并处理错误，显示登录失败提示
    toast.error(t('register.failureMessage'), {
      timeout: 2000
    })
  } finally {
    loading.value = false;
  }
}
</script>

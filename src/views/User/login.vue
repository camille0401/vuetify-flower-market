<template>
  <FormPanel :title="$t('login.welcomeBack')" :subTitle="$t('login.seeYouAgain')" :footTitle="$t('login.noAccount')"
    :footBtnText="$t('login.registerNow')" @on-foot-btn="toRegister">

    <template #main>
      <v-form ref="loginFormRef" validate-on="submit" @submit.prevent="doLogin">
        <EmailTextField v-model="loginForm" />
        <PasswordTextField v-model="loginForm" :showPassword="showPassword" />
        <div class="d-flex justify-space-between">
          <v-checkbox v-model="showPassword" color="primary" :label="$t('login.showPassword')" hide-details />
          <v-btn class="forget " color="primary" variant="text" to="/user/forgot">{{
            $t('login.forgotPassword') }}</v-btn>
        </div>
        <br>

        <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
          {{ $t('login.login') }}
        </v-btn>
      </v-form>
    </template>

  </FormPanel>
</template>

<script setup>
import FormPanel from './components/FormPanel.vue'
import EmailTextField from './components/EmailTextField.vue'
import PasswordTextField from './components/PasswordTextField.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'  // Import useI18n to access translations
import { useToast } from "vue-toastification"
import { encrypt } from '@/utils/rsaEncrypt'

// Initialize i18n
const { t } = useI18n();  // Use `t` for translation

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// 登录
const showPassword = ref(false)
const loginFormRef = ref()
const loading = ref(false)
const loginForm = ref({
  username: "",
  password: ""
})

const doLogin = async () => {
  // 先进行表单校验
  const { valid } = await loginFormRef.value.validate();
  if (!valid) {
    toast.error(t('login.invalidFormMessage'), { timeout: 2000 });
    return;
  }

  loading.value = true;
  const { username, password } = loginForm.value;

  try {
    // 尝试登录
    await userStore.login({ username, password: encrypt(password) });

    toast.success(t('login.successMessage'), { timeout: 2000 });

    // 跳转页面
    const redirect = route.query.redirect || '/';
    router.replace(redirect);

    // 重置表单
    loginForm.value = { username: "", password: "" };
  } catch (error) {
    // 捕获并处理错误，显示注册失败提示
    // toast.error(t('login.failureMessage'), {
    //   timeout: 2000
    // })
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
}

const toRegister = () => {
  // 跳转到注册页面
  router.push("/user/register")

  // 重置表单
  loginFormRef.value.reset()
}

</script>

<style scoped lang="scss">
.forget {
  height: 56px;
  line-height: 56px;
}

.span {
  margin-left: 5px;
  font-size: 14px;
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
  cursor: pointer;
}
</style>

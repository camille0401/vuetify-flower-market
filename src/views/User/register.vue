<template>
  <!-- 注册 -->
  <div class="form-box">
    <h1>Create Account</h1>
    <v-form ref="registerFormRef" @submit.prevent="doRegister">
      <EmailTextField v-model="registerForm" />
      <PasswordTextField v-model="registerForm" />
      <PasswordCheckTextField v-model="registerForm" />
      <br>
      <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
        Sign Up
      </v-btn>
    </v-form>
    <p class="p">Already have an acount <span class="span" @click="toLogin">Sign In</span> </p>
    <!-- <p class="p line">Or With</p> -->
    <!-- <SocialButtons /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification";
import EmailTextField from './components/EmailTextField.vue';
import PasswordTextField from './components/PasswordTextField.vue';
import PasswordCheckTextField from './components/PasswordCheckTextField.vue';
import SocialButtons from './components/SocialButtons.vue';

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

// 注册
const registerFormRef = ref()
const registerForm = ref({
  username: "456@qq.com",
  password: "",
  checkPassword: ""
})

const toLogin = () => {
  router.push("/user/login")
  registerFormRef.value.reset()
}
const doRegister = async () => {
  const { valid } = await registerFormRef.value.validate()
  if (valid) {
    const { username, password } = registerForm.value
    const nickname = username.split("@")[0]
    const res = await userStore.register({ username, nickname, password })
    console.log(res)
    if (res) {
      toast.success("注册成功,请登录", {
        timeout: 2000
      });
      toLogin();
    }
  }

}

</script>

<style lang="scss" scoped>
.form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  margin-right: 20px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  h1 {
    font-size: 3rem;
    color: #151717;
    margin: 0 0 20px;
    letter-spacing: 2px;
    font-weight: bold;
    text-align: center;
  }

  .forget {
    min-height: 56px;
  }

  .span {
    margin-left: 5px;
    font-size: 14px;
    color: $fs-base-color-dark;
    font-weight: 500;
    cursor: pointer;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }
}
</style>

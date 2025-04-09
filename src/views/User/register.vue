<template>
  <!-- 注册 -->
  <div class="form-box">
    <h1 class="text-h5 text-center">Create An Account</h1>
    <p class="text-subtitle-2	text-center mb-10" style="color: #757575;">Welcome to Flower Market</p>
    <v-form ref="registerFormRef" @submit.prevent="doRegister">
      <EmailTextField v-model="registerForm" />
      <PasswordTextField v-model="registerForm" :showPassword="showPassword" />
      <PasswordCheckTextField v-model="registerForm" :showPassword="showPassword" />
      <v-checkbox v-model="showPassword" color="primary" label="Show Password" hide-details></v-checkbox>
      <br>
      <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
        注册
      </v-btn>
    </v-form>
    <p class="p">Already have an acount <span class="span" @click="toLogin">去登录</span> </p>
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
const showPassword = ref(false)
const registerFormRef = ref()
const registerForm = ref({
  username: "",
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

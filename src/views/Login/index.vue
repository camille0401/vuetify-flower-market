<template>
  <div class="fs-login-page">
    <section class="login-section">
      <div class="container">
        <!-- 登录 -->
        <div class="form-box" v-show="isLogin">
          <h1>Welcome Back</h1>
          <v-form ref="loginFormRef" @submit.prevent="doLogin">
            <v-text-field v-model="loginForm.account" :rules="AccountRules" variant="outlined"
              prepend-inner-icon="mdi-at" class="mb-2" label="Email" clearable>
            </v-text-field>
            <v-text-field v-model="loginForm.password" :rules="PasswordRules" variant="outlined"
              prepend-inner-icon="mdi-lock-outline" label="Password" placeholder="Enter your password" clearable>
            </v-text-field>
            <div class="d-flex justify-space-between">
              <v-checkbox label="Remember me"></v-checkbox>
              <a href="javascript:void(0);" class="d-flex align-center span forget">忘记密码?</a>
            </div>
            <br>
            <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
              Sign In
            </v-btn>
          </v-form>
          <p class="p">Don't have an account? <span class="span" @click="showRegister">Sign Up</span> </p>
          <p class="p line">Or With</p>

          <div class="flex-row">
            <button class="btn google">
              <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <path style="fill:#FBBB00;" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
                <path style="fill:#518EF8;" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"></path>
                <path style="fill:#28B446;" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"></path>
                <path style="fill:#F14336;" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
C318.115,0,375.068,22.126,419.404,58.936z"></path>
              </svg>
              Google
            </button><button class="btn apple">
              <svg version="1.1" height="20" width="20" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.773 22.773"
                style="enable-background:new 0 0 22.773 22.773;" xml:space="preserve">
                <g>
                  <g>
                    <path
                      d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z">
                    </path>
                    <path
                      d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z">
                    </path>
                  </g>
                </g>
              </svg>
              Apple
            </button>
          </div>
        </div>
        <!-- 注册 -->
        <div class="form-box" v-show="!isLogin">
          <h1>Create Account</h1>
          <v-form ref="registerFormRef" @submit.prevent="doRegister">
            <v-text-field v-model="registerForm.account" :rules="AccountRules" variant="outlined"
              prepend-inner-icon="mdi-at" class="mb-2" label="Email" clearable>
            </v-text-field>
            <v-text-field v-model="registerForm.password" :rules="PasswordRules" variant="outlined"
              prepend-inner-icon="mdi-lock-outline" label="Password" placeholder="Enter your password" clearable>
            </v-text-field>
            <v-text-field v-model="registerForm.checkPassword" :rules="checkPasswordRules" variant="outlined"
              prepend-inner-icon="mdi-lock-outline" label="checkPassword" placeholder="Enter your password" clearable>
            </v-text-field>
            <br>
            <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
              Sign Up
            </v-btn>
          </v-form>
          <p class="p">Already have an acount <span class="span" @click="showLogin">Sign In</span> </p>
          <p class="p line">Or With</p>
          <div class="flex-row">
            <button class="btn google">
              <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <path style="fill:#FBBB00;" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
                <path style="fill:#518EF8;" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"></path>
                <path style="fill:#28B446;" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"></path>
                <path style="fill:#F14336;" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
C318.115,0,375.068,22.126,419.404,58.936z"></path>
              </svg>
              Google
            </button><button class="btn apple">
              <svg version="1.1" height="20" width="20" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.773 22.773"
                style="enable-background:new 0 0 22.773 22.773;" xml:space="preserve">
                <g>
                  <g>
                    <path
                      d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z">
                    </path>
                    <path
                      d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z">
                    </path>
                  </g>
                </g>
              </svg>
              Apple
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import $snackbar from '@/components/FSSnackbar';

const $toast = useToast();
const userStore = useUserStore();
const router = useRouter();

// login-register-animation
const isLogin = ref(true)
// go-register-btn
const showRegister = () => {
  isLogin.value = false;
  loginFormRef.value.reset()
}
// go-login-btn
const showLogin = () => {
  isLogin.value = true;
  registerFormRef.value.reset()
}

const loginFormRef = ref()
const loading = ref(false)
const loginForm = ref({
  account: "",
  password: ""
})
const EmailRules = ref([
  value => {
    if (value) return true

    return 'E-mail is required.'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
])
const AccountRules = ref([v => !!v || 'Email is required'])
const PasswordRules = ref([
  v => !!v || 'Passrord is required',
])

const doLogin = async () => {
  // $toast.open({
  //   message: '登录成功',
  //   type: 'info',
  //   position: 'top'
  // })

  const { valid } = await loginFormRef.value.validate()

  if (valid) {
    const { account, password } = loginForm.value
    userStore.login({ account, password })
    // 1. 提示用户
    $snackbar.show({
      color: "success",
      message: "登录成功"
    })
    // 2. 跳转首页
    router.replace({ path: '/' })
  }
}
const registerFormRef = ref()
const registerForm = ref({
  account: "",
  password: "",
  checkPassword: ""
})
const checkPasswordRules = ref([
  v => !!v || 'Check Passrord is required',
  v => {
    if (v === registerForm.value.password) return true

    return '两次输入密码不一致'
  },
])

const doRegister = async () => {
  // $toast.open({
  //   message: '登录成功',
  //   type: 'info',
  //   position: 'top'
  // })

}

// 注册

</script>

<style scoped lang='scss'>
.fs-login-page {
  background: #ffffff;
  background-position: center;
  background-size: cover;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20vh;

  p {
    font-size: 14px;
    color: #FFF;
  }

  .toHome {
    --line: #e84393;
    --color: #e84393;
    text-decoration: none;
    color: var(--color);
    position: relative;

    span {
      background-image: linear-gradient(0deg, var(--line) 0%, var(--line) 100%);
      background-position: 100% 100%;
      background-repeat: no-repeat;
      background-size: var(--background-size, 100%) 1px;
      transition: background-size .2s linear var(--background-delay, .15s);
      font-size: 16px;
      line-height: 20px;
      transform: translateZ(0);
    }

    svg {
      vertical-align: top;
      display: inline;
      line-height: 1;
      width: 13px;
      height: 20px;
      position: relative;
      left: -2px;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1px;
      stroke: var(--line);
      stroke-dasharray: 7.95 30;
      stroke-dashoffset: var(--stroke-dashoffset, 46);
      transition: stroke-dashoffset var(--stroke-duration, .15s) var(--stroke-easing, linear) var(--stroke-delay, 0s);
    }

    &:hover {
      --background-size: 0%;
      --background-delay: 0s;
      --stroke-dashoffset: 26;
      --stroke-duration: .3s;
      --stroke-easing: cubic-bezier(.3, 1.5, .5, 1);
      --stroke-delay: .195s;
    }
  }
}


.login-section {
  width: 100%;
  background: url("@/assets/images/login-bg.jpg");
  background-position: center;
  background-size: cover;
  padding: 50px;

  .container {
    display: flex;
    justify-content: flex-end;
  }

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

    .flex-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
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

    .btn {
      margin-top: 10px;
      width: 100%;
      height: 50px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      gap: 10px;
      border: 1px solid #ededef;
      background-color: white;
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }

    .btn:hover {
      border: 1px solid $fs-base-color-dark;
      ;
    }
  }

}

.login-footer {
  padding: 0 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>

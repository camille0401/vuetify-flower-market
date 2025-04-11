import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, registerAPI } from '@/apis/user'
import { useCartStore } from './cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const token = ref('')
    const cartStore = useCartStore()

    const clearUserInfo = () => {
      userInfo.value = {}
      token.value = ''
      cartStore.clearCartList()
    }

    const getUserInfo = async (data) => {
      token.value = data.token
      userInfo.value = data.user
      // const res = await userInfoAPI()
      // if (res) {
      // }
    }

    const login = async (value) => {
      const res = await loginAPI(value)
      if (res) {
        getUserInfo(res)
        // 合并购物车
        cartStore.mergeCartList()
      }
    }

    const register = async (value) => {
      const res = await registerAPI(value)
      return Promise.resolve(res)
    }

    return {
      userInfo,
      token,
      getUserInfo,
      clearUserInfo,
      login,
      register
    }
  },
  {
    persist: true
  }
)

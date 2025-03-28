import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const token = ref('')
    const cartStore = useCartStore()

    const getUserInfo = (data) => {
      userInfo.value = data
      token.value = data.token
    }

    const clearUserInfo = () => {
      userInfo.value = {}
      token.value = ''
    }

    const login = async (value) => {
      const res = await loginAPI(value)
      if (res.code === '1') {
        getUserInfo(res.result)
        // 合并购物车
        cartStore.mergeCartList()
      }
    }

    return {
      userInfo,
      token,
      getUserInfo,
      clearUserInfo,
      login,
    }
  },
  {
    persist: true,
  },
)

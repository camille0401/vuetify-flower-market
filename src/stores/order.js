import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore(
  'order',
  () => {
    const curAddress = ref({})
    const goodsList = ref([])
    const deliveryTime = ref('')
    const summary = ref({})

    const setCurAddress = (data) => {
      curAddress.value = data
    }

    const setGoodsList = (data) => {
      goodsList.value = data
    }

    const setDeliveryTime = (data) => {
      deliveryTime.value = data
    }

    const setSummary = (data) => {
      summary.value = data
    }

    const clearOrderData = () => {
      curAddress.value = {}
      goodsList.value = []
      deliveryTime.value = ''
      summary.value = {}
    }

    return {
      goodsList,
      curAddress,
      deliveryTime,
      summary,
      clearOrderData,
      setCurAddress,
      setGoodsList,
      setDeliveryTime,
      setSummary
    }
  },
  {
    persist: true
  }
)

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchOrderAPI, createOrderAPI } from '@/apis/order'

export const useOrderStore = defineStore('order', () => {
  const orderList = ref([])
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

  const fetchOrderList = async () => {
    try {
      const res = await fetchOrderAPI()
      orderList.value = res || []
    } catch (err) {
      throw err
    } finally {
    }
  }

  // 创建订单/提交订单
  const sumitOrder = async (data) => {
    try {
      await createOrderAPI(data)
    } catch (err) {
      throw err
    } finally {
    }
  }
  return {
    goodsList,
    curAddress,
    deliveryTime,
    summary,
    clearOrderData,
    sumitOrder,
    fetchOrderList,
    setCurAddress,
    setGoodsList,
    setDeliveryTime,
    setSummary
  }
})

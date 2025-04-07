import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getHomeGoodsTypeAPI } from '@/apis/global'

export const useCategoryStore = defineStore('category', () => {
  /**
   *catogory list data
   */

  const categoryList = ref([])
  const getCategory = async () => {
    const res = await getHomeGoodsTypeAPI()
    categoryList.value = res || []
  }

  return {
    categoryList,
    getCategory,
  }
})

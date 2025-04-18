import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getHomeGoodsTypeAPI } from '@/apis/global';

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([]);

  // 获取分类数据
  const getCategory = async () => {
    try {
      const res = await getHomeGoodsTypeAPI();
      categoryList.value = res || [];
    } catch (err) {
      console.error('获取分类失败:', err);
    } finally {
    }
  };

  return {
    categoryList,
    getCategory,
  };
});

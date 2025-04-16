<template>
  <div class="fs-category-page">
    <div class="container pb-10">
      <v-card elevation="2" rounded="lg">
        <!-- 面包屑导航 -->
        <v-card-title class="px-6 pt-6 pb-4">
          <v-breadcrumbs :items="breadcrumbItems" class="px-0">
            <template v-slot:divider>
              <v-icon size="small">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <!-- 子分类导航 -->
          <div class="category-type-box mb-6">
            <div class="title text-subtitle-1 font-weight-bold">分类</div>
            <ul class="list">
              <li v-for="sub in subCategoryList" :key="sub.id">
                <RouterLink active-class="active" :to="`/category/2/${sub.id}`" class="subcategory-link">
                  {{ sub.cname }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <v-divider class="mb-4" />

          <!-- 排序选项卡 -->
          <v-tabs color="primary-darken-1" v-model="reqData.orderBy" @update:modelValue="handleSortChange" class="mb-6">
            <v-tab value="">综合</v-tab>
            <v-tab value="publishTime">最新商品</v-tab>
            <v-tab value="orderNum">最高人气</v-tab>
            <v-tab value="evaluateNum">评论最多</v-tab>
          </v-tabs>

          <!-- 商品列表 -->
          <div v-if="loading" class="text-center py-10">
            <v-progress-circular indeterminate color="primary" />
          </div>

          <div v-else-if="goodsList.length > 0" class="category-goods-list">
            <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" imgHeight="250px"
              class="goods-item" />
          </div>

          <div v-else class="empty-box py-10">
            <FSEmptyPannel title="暂无相关商品" text="换个筛选条件试试吧~" />
          </div>

          <!-- 分页 -->
          <v-pagination v-if="totalPages > 1" v-model="reqData.page" :length="totalPages"
            @update:modelValue="handlePageChange" class="mt-6" color="primary" />
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getCategoryAPI, getCategoryGoodsAPI } from "@/apis/category"
import FSGoodsItem from "@/components/FSGoodsItem.vue"
import FSEmptyPannel from "@/components/FSEmptyPanel.vue"


const route = useRoute()

// 数据状态
const categoryData = ref({})
const subCategoryData = ref({})
const subCategoryList = ref([])
const goodsList = ref([])
const loading = ref(false)
const totalPages = ref(1)

// 请求参数
const reqData = ref({
  typeId: route.params.id,
  orderBy: '',
  // page: 1,
  // pageSize: 12
})

// 计算面包屑导航项
const breadcrumbItems = computed(() => {
  const items = [
    { title: '首页', disabled: false, href: '/' }
  ]

  if (route.params.type === '1') {
    items.push({
      title: categoryData.value.cname || '加载中...',
      disabled: true
    })
  } else {
    if (categoryData.value.id) {
      items.push({
        title: categoryData.value.cname,
        disabled: false,
        href: `/category/1/${categoryData.value.id}`
      })
    }
    items.push({
      title: subCategoryData.value.cname || '加载中...',
      disabled: true
    })
  }

  return items
})

// 获取分类数据
const fetchCategoryData = async (id = route.params.id) => {
  try {
    loading.value = true
    const res = await getCategoryAPI(id)

    if (route.params.type === '2') {
      const storedData = sessionStorage.getItem("categoryData")
      categoryData.value = storedData ? JSON.parse(storedData) : {}
      subCategoryData.value = res?.category || {}
    } else {
      categoryData.value = res?.category || {}
      sessionStorage.setItem("categoryData", JSON.stringify(res?.category || {}))
    }

    subCategoryList.value = res?.subCategorys || []
  } catch (error) {
    console.error('获取分类数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取商品数据
const fetchGoodsData = async () => {
  try {
    loading.value = true
    const res = await getCategoryGoodsAPI(reqData.value)
    goodsList.value = res?.goods || []
    // totalPages.value = Math.ceil((res?.total || 0) / reqData.value.pageSize)
  } catch (error) {
    console.error('获取商品数据失败:', error)
    goodsList.value = []
  } finally {
    loading.value = false
  }
}

// 路由变化时重新获取数据
watch(() => route.params.id, (newId) => {
  reqData.value.typeId = newId
  // reqData.value.page = 1 // 重置页码
  fetchCategoryData(newId)
  fetchGoodsData()
}, { immediate: true })

// 排序变化处理
const handleSortChange = (value) => {
  reqData.value.orderBy = value
  // reqData.value.page = 1 // 重置页码
  fetchGoodsData()
}

// 分页变化处理
const handlePageChange = (page) => {
  // reqData.value.page = page
  fetchGoodsData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 组件卸载时清理
onUnmounted(() => {
  sessionStorage.removeItem("categoryData")
})
</script>

<style lang="scss" scoped>
.fs-category-page {

  // 子分类导航
  .category-type-box {
    display: flex;
    align-items: center;
    gap: 20px;

    .title {
      min-width: max-content;
      color: var(--v-primary-darken1);
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 0;

      li {
        display: flex;
        align-items: center;

        .subcategory-link {
          padding: 0 12px;
          color: var(--v-theme-text-secondary);
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;

          &:hover {
            color: var(--v-primary-base);
          }

          &.active {
            color: var(--v-primary-base);
            font-weight: 500;
          }

          &:not(:last-child)::after {
            content: "";
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 14px;
            background-color: #e0e0e0;
          }
        }
      }
    }
  }

  // 商品列表
  .category-goods-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 0 10px;

    .goods-item {
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }
  }

  // 空状态
  .empty-box {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 响应式设计
@media (max-width: 960px) {
  .fs-category-page {
    .category-goods-list {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
  }
}

@media (max-width: 600px) {
  .fs-category-page {
    .category-type-box {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .category-goods-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
}
</style>

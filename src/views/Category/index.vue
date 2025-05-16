<template>
  <section class="fs-category-page">
    <v-container class="mx-auto pb-10">
      <v-sheet color="surface" class="pa-4" elevation="2">
        <!-- 面包屑导航 -->
        <v-breadcrumbs :items="breadcrumbItems" class="px-0 text-body-2">
          <template v-slot:divider>
            <v-icon size="small">mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>

        <!-- 子分类导航 -->
        <ul class="category-list mb-6">
          <li v-for="sub in subCategoryList" :key="sub.id">
            <v-btn active-class="active" :to="`/category/2/${sub.id}`" variant="text">
              {{ sub.cname }}
            </v-btn>
          </li>
        </ul>

        <!-- 排序选项卡 -->
        <!-- <v-tabs color="primary-darken-1" v-model="reqData.orderBy" @update:modelValue="handleSortChange" class="mb-6">
          <v-tab value="">{{ $t('category.tabs.tab0') }}</v-tab>
          <v-tab value="publishTime">{{ $t('category.tabs.tab1') }}</v-tab>
          <v-tab value="orderNum">{{ $t('category.tabs.tab2') }}</v-tab>
          <v-tab value="evaluateNum">{{ $t('category.tabs.tab3') }}</v-tab>
        </v-tabs> -->

        <div v-if="loading" class="text-center py-10">
          <v-progress-circular indeterminate color="primary" />
        </div>

        <!-- 商品列表 -->
        <v-row v-else-if="goodsList.length > 0" class="goods-list" :dense="xs">
          <v-col v-for="goods in goodsList" :key="goods.id" cols="6" sm="4" md="3" lg="3" class="goods-item">
            <v-fade-transition>
              <FSGoodsItem :goods="goods" />
            </v-fade-transition>
          </v-col>
        </v-row>

        <div v-else class="empty-box py-10">
          <v-empty-state color="primary" size="40" icon="mdi-magnify" :text="$t('category.emptyText')"
            :title="$t('category.emptyTitle')">
          </v-empty-state>
        </div>

        <!-- 分页 -->
        <v-pagination v-if="totalPages > 1" v-model="reqData.page" :length="totalPages"
          @update:modelValue="handlePageChange" class="mt-6" color="primary" />
        <!-- <v-card-text class="pb-6">
        </v-card-text> -->
      </v-sheet>

    </v-container>
  </section>
</template>

<script setup>
import FSGoodsItem from "@/components/FSGoodsItem.vue"
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getCategoryAPI, getCategoryGoodsAPI } from "@/apis/category"
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
// import {  }

const { xs } = useDisplay()
const { t } = useI18n()
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
    { title: t('category.breadcrumbsHome'), disabled: false, href: '/' }
  ]

  if (route.params.type === '1') {
    items.push({
      title: categoryData.value.cname,
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
      title: subCategoryData.value.cname,
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

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    li {
      display: flex;
      align-items: center;

      .subcategory-link {
        padding: 0 12px;
        color: rgb(var(--v-theme-text-secondary));
        font-size: 14px;
        font-weight: 400;
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
          color: rgb(var(--v-theme-primary-darken-1));
        }

        &.active {
          color: rgb(var(--v-theme-primary-darken-1));
          font-weight: 500;
        }


      }
    }
  }

  .goods-item {
    transition: transform 0.3s ease;

    /* 改为 visible 让阴影不被裁剪 */
    &:hover {
      transform: translateY(-5px);
      z-index: 2;
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
</style>

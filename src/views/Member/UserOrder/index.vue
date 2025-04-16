<template>
  <div class="order-list-page">
    <v-card rounded="lg" flat class="pa-4">
      <v-card-title class="text-h5 font-weight-bold mb-4">我的订单</v-card-title>
      <v-divider class="mb-4" />

      <!-- 订单状态选项卡 -->
      <v-tabs v-model="activeTab" color="primary" grow @update:model-value="handleTabChange">
        <v-tab v-for="tab in orderTabs" :key="tab.value" :value="tab.value" class="text-capitalize">
          <v-icon :icon="tab.icon" class="mr-2" />
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <!-- 加载状态 -->
      <v-progress-linear v-if="isLoading" indeterminate color="primary" class="my-4" />

      <!-- 订单列表内容 -->
      <template v-else>
        <!-- 空状态 -->
        <v-alert v-if="orders.length === 0" type="info" variant="tonal" class="my-6" icon="mdi-gift">
          当前没有相关订单
          <template v-slot:append>
            <v-btn color="primary" variant="text" to="/">去逛逛</v-btn>
          </template>
        </v-alert>

        <!-- 订单列表 -->
        <template v-else>
          <order-card v-for="order in orders" :key="order.id" :order="order" @cancel="handleCancelOrder"
            @view-detail="toOrderDetailPage" class="my-4" />

          <!-- 分页 -->
          <!-- <v-pagination v-model="pagination.page" :length="totalPages" :total-visible="7"
            @update:model-value="handlePageChange" class="mt-6" color="primary" /> -->
        </template>
      </template>
    </v-card>

    <!-- 取消订单确认对话框 -->
    <FSConfirmationDialog v-model="cancelDialog.show" :title="`取消订单`" :content="`确定要取消此订单吗？此操作不可逆！`" contentIcon=""
      confirm-color="error" confirm-text="确认取消" @confirm="confirmCancelOrder" />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import OrderCard from './components/OrderCard.vue'
import FSConfirmationDialog from '@/components/FSConfirmationDialog.vue'
import { fetchOrderAPI, cancelOrderAPI } from '@/apis/order'
import { usePagination } from '@/composables/usePagination'

const toast = useToast()
const router = useRouter()

// 订单状态配置
const orderTabs = [
  { value: 'all', label: '全部订单', icon: 'mdi-package-variant' },
  { value: 0, label: '待发货', icon: 'mdi-truck-delivery-outline' },
  { value: 1, label: '待付款', icon: 'mdi-credit-card-clock-outline' },
  { value: 2, label: '已支付', icon: 'mdi-package-variant-closed' },
  { value: 3, label: '已完成', icon: 'mdi-check-circle-outline' },
  { value: 4, label: '已取消', icon: 'mdi-close-circle-outline' },
  { value: 5, label: '退款/售后', icon: 'mdi-cash-refund' }
]

// 组件状态
const activeTab = ref('all')
const orders = ref([])
const isLoading = ref(false)
const cancelDialog = ref({ show: false, id: null })

// 分页逻辑
const { pagination, totalPages, handlePageChange } = usePagination()

// 获取订单列表
const fetchOrders = async () => {
  try {
    isLoading.value = true
    const params = {
      orderStatus: activeTab.value === 'all' ? '' : activeTab.value,
      // page: pagination.value.page,
      // pageSize: pagination.value.pageSize
    }

    const res = await fetchOrderAPI(params)
    orders.value = res || []
    // pagination.value.total = data?.total || 0
  } catch (error) {
    console.error('Fetch orders error:', error)
  } finally {
    isLoading.value = false
  }
}

// 订单操作处理
const handleCancelOrder = (id) => {
  cancelDialog.value = { show: true, id }
}

const confirmCancelOrder = async () => {
  try {
    await cancelOrderAPI(cancelDialog.value.id)
    toast.success('订单取消成功')
    fetchOrders()
  } catch (error) {
  } finally {
    cancelDialog.value.show = false
  }
}

// 查看订单详情
const toOrderDetailPage = (id) => {
  router.push(`/order/detail/${id}`)
}

// 处理选项卡变化
const handleTabChange = () => {
  // pagination.value.page = 1
  fetchOrders()
}

// 初始化加载
onMounted(() => fetchOrders())
</script>

<style lang="scss" scoped>
.order-list-page {
  .v-pagination {
    justify-content: center;
  }

  @media (max-width: 600px) {
    .v-tabs {
      :deep(.v-slide-group__content) {
        justify-content: space-between;
      }

      .v-tab {
        flex: 1;
        min-width: 0;
        padding: 0 8px;
        font-size: 0.75rem;

        .v-icon {
          margin-right: 4px;
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>

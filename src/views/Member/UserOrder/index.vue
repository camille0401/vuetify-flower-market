<template>
  <div class="order-list-page">
    <v-card rounded="lg" flat class="pa-4">
      <v-card-title class="text-h5 font-weight-bold mb-4">{{ $t('member.order.title') }}</v-card-title>
      <v-divider class="mb-4" />

      <!-- 订单状态选项卡 -->
      <v-tabs v-model="activeTab" color="primary" grow @update:model-value="handleTabChange">
        <v-tab v-for="tab in orderTabs" :key="tab.value" :value="tab.value" class="text-capitalize">
          <!-- <v-icon :icon="tab.icon" class="mr-2" /> -->
          {{ $t(tab.label) }}
        </v-tab>
      </v-tabs>

      <!-- 加载状态 -->
      <v-progress-linear v-if="isLoading" indeterminate color="primary" class="my-4" />

      <!-- 订单列表内容 -->
      <template v-else>
        <!-- 空状态 -->
        <v-alert v-if="orders.length === 0" type="info" variant="tonal" class="my-6" icon="mdi-gift">
          {{ $t('member.order.empty') }}
          <template v-slot:append>
            <v-btn color="primary" variant="text" to="/">{{ $t('member.order.goShopping') }}</v-btn>
          </template>
        </v-alert>

        <!-- 订单列表 -->
        <template v-else>
          <order-card v-for="order in orders" :key="order.id" :order="order" :orderTabs="orderTabs"
            @cancel="handleCancelOrder" @view-detail="toOrderDetailPage" class="my-4" />

          <!-- 分页 -->
          <!-- <v-pagination v-model="pagination.page" :length="totalPages" :total-visible="7"
            @update:model-value="handlePageChange" class="mt-6" color="primary" /> -->
        </template>
      </template>
    </v-card>

    <!-- 取消订单确认对话框 -->
    <FSConfirmationDialog v-model="cancelDialog.show" :title="$t('member.order.cancelConfirmTitle')"
      :content="$t('member.order.cancelConfirmContent')" contentIcon="" confirm-color="error"
      :confirm-text="$t('member.order.cancelConfirmBtn')" @confirm="confirmCancelOrder" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import OrderCard from './components/OrderCard.vue'
import FSConfirmationDialog from '@/components/FSConfirmationDialog.vue'
import { fetchOrderAPI, cancelOrderAPI } from '@/apis/order'
import { usePagination } from '@/composables/usePagination'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()

// 订单状态配置
const orderTabs = [
  { value: 'all', label: 'member.order.status.all', icon: 'mdi-package-variant', color: 'grey', },
  { value: 0, label: 'member.order.status.pending', icon: 'mdi-truck-delivery-outline', color: 'info' },
  { value: 1, label: 'member.order.status.waitingPayment', icon: 'mdi-credit-card-clock-outline', color: 'warning' },
  { value: 2, label: 'member.order.status.paid', icon: 'mdi-package-variant-closed', color: 'primary' },
  { value: 3, label: 'member.order.status.completed', icon: 'mdi-check-circle-outline', color: 'success' },
  { value: 4, label: 'member.order.status.canceled', icon: 'mdi-close-circle-outline', color: 'error' },
  { value: 5, label: 'member.order.status.refund', icon: 'mdi-cash-refund', color: 'deep-purple' }
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
    toast.success(t('member.order.cancelSuccess'))
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

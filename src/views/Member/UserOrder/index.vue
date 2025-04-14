<template>
  <div class="order-list-page">
    <v-card class="pa-4" rounded="lg" flat>
      <v-card-title class="text-h5 font-weight-bold mb-4">我的订单</v-card-title>

      <!-- 订单状态选项卡 -->
      <v-tabs v-model="activeTab" color="primary" @update:model-value="handleTabChange">
        <v-tab v-for="tab in tabs" :key="tab.name" :value="tab.name" class="text-capitalize">
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <!-- 加载状态 -->
      <v-progress-linear v-if="isLoading" indeterminate color="primary" class="my-4" />

      <!-- 订单列表 -->
      <div v-if="orders.length > 0" class="mt-6">
        <v-card v-for="order in orders" :key="order.id" class="mb-6" flat outlined
          :class="`order-card order-status-${order.status}`">
          <!-- 订单头部 -->
          <v-card-title class="d-flex justify-space-between align-center bg-grey-lighten-4 pa-4">
            <div class="d-flex flex-wrap align-center gap-4">
              <span class="font-weight-medium">订单编号: {{ order.orderNo }}</span>
              <span class="text-caption">下单时间: {{ formatTime(order.createTime) }}</span>
            </div>
            <v-chip :color="orderStatusMap[order.status]?.color" :prepend-icon="orderStatusMap[order.status]?.icon">
              {{ orderStatusMap[order.status]?.text }}
            </v-chip>
          </v-card-title>

          <!-- 订单商品 -->
          <v-card-text class="pa-0">
            <v-table density="comfortable">
              <thead>
                <tr>
                  <th class="text-left">商品信息</th>
                  <th class="text-center">单价</th>
                  <th class="text-center">数量</th>
                  <th class="text-center">小计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orders" :key="item.id">
                  <td>
                    <div class="d-flex align-center py-4">
                      <v-img :src="item.picture" width="80" height="80" contain class="mr-4 rounded-lg" />
                      <div>
                        <div class="text-body-1 font-weight-medium">{{ item.name }}</div>
                        <div class="text-caption text-grey">{{ item.attrsText }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">¥{{ item.price?.toFixed(2) }}</td>
                  <td class="text-center">×{{ item.quantity }}</td>
                  <td class="text-center text-error">¥{{ (item.price * item.quantity)?.toFixed(2) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>

          <!-- 订单底部 -->
          <v-divider />
          <v-card-actions class="d-flex justify-space-between align-center pa-4">
            <div class="text-body-1">
              共 {{ order.length }} 件商品，合计:
              <span class="text-h6 text-error ml-2">¥{{ calculateOrderTotal(order).toFixed(2) }}</span>
            </div>

            <div class="d-flex gap-2">
              <v-btn v-if="order.status === 1" color="error" variant="text" prepend-icon="mdi-close"
                @click="cancelOrder(order.id)">
                取消订单
              </v-btn>

              <v-btn v-if="order.status === 1" color="primary" prepend-icon="mdi-credit-card-outline"
                @click="$router.push(`/order/pay/${order.id}`)">
                去支付
              </v-btn>

              <v-btn v-if="order.status === 2" color="primary" variant="outlined" prepend-icon="mdi-check"
                @click="confirmReceipt(order.id)">
                确认收货
              </v-btn>

              <v-btn color="primary" variant="text" prepend-icon="mdi-information-outline"
                @click="$router.push(`/order/detail/${order.id}`)">
                订单详情
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>

        <!-- 分页 -->
        <v-pagination v-model="pagination.page" :length="Math.ceil(pagination.total / pagination.pageSize)"
          :total-visible="7" @update:model-value="handlePageChange" class="mt-6 justify-center" />
      </div>

      <!-- 空状态 -->
      <v-alert v-else type="info" variant="tonal" class="my-6"
        :icon="isLoading ? undefined : 'mdi-package-variant-closed'">
        <template v-if="isLoading">
          加载中...
        </template>
        <template v-else>
          暂无订单数据
          <!-- <template #append>
            <v-btn color="primary" variant="text" to="/">去逛逛</v-btn>
          </template> -->
        </template>
      </v-alert>
    </v-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchOrderAPI } from '@/apis/order'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const toast = useToast()

// 订单状态选项卡
const activeTab = ref('all')
const tabs = [
  { name: "all", label: "全部订单", state: '' },
  { name: "deliver", label: "待发货", state: '0' },
  { name: "unpay", label: "待付款", state: '1' },
  { name: "receive", label: "待收货", state: '2' },
  { name: "complete", label: "已完成", state: '3' },
  { name: "cancel", label: "已取消", state: '4' },
  { name: "refund", label: "退款/售后", state: '5' },
]

// 订单状态映射
const orderStatusMap = {
  0: { text: '待发货', color: 'info', icon: 'mdi-truck-delivery-outline' },
  1: { text: '待付款', color: 'warning', icon: 'mdi-credit-card-clock-outline' },
  2: { text: '待收货', color: 'primary', icon: 'mdi-package-variant-closed' },
  3: { text: '已完成', color: 'success', icon: 'mdi-check-circle-outline' },
  4: { text: '已取消', color: 'error', icon: 'mdi-close-circle-outline' },
  5: { text: '已退款', color: 'success', icon: 'mdi-cash-refund' },
}

// 订单数据
const orders = ref([])
const isLoading = ref(false)
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

// 获取订单列表
const fetchOrders = async () => {
  try {
    isLoading.value = true
    const params = {
      orderStatus: tabs.find(t => t.name === activeTab.value)?.state || '',
      // page: pagination.value.page,
      // pageSize: pagination.value.pageSize
    }

    const res = await fetchOrderAPI(params)
    orders.value = res || []
    // pagination.value.total = data.total || 0
  } catch (error) {
    // toast.error('获取订单列表失败')
    isLoading.value = false
    console.error('Fetch orders error:', error)
  } finally {
    isLoading.value = false
  }
}

// 切换选项卡
const handleTabChange = () => {
  pagination.value.page = 1
  fetchOrders()
}

// 分页变化
const handlePageChange = (page) => {
  pagination.value.page = page
  fetchOrders()
}

// 格式化时间
const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}

// 计算订单总金额
const calculateOrderTotal = (order) => {
  return orders.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

// 订单操作
const cancelOrder = async (orderId) => {
  try {
    // await cancelOrderAPI(orderId)
    toast.success('订单已取消')
    fetchOrders()
  } catch (error) {
    toast.error('取消订单失败')
  }
}

const confirmReceipt = async (orderId) => {
  try {
    // await confirmReceiptAPI(orderId)
    toast.success('已确认收货')
    fetchOrders()
  } catch (error) {
    toast.error('确认收货失败')
  }
}

// 初始化加载
onMounted(() => fetchOrders)
</script>


<style lang="scss" scoped>
.order-list-page {
  .order-card {
    transition: box-shadow 0.3s ease;
    border-radius: 8px;
    overflow: hidden;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .v-table {
    th {
      font-weight: 600;
      background-color: rgba(0, 0, 0, 0.02);
    }

    tr:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
  }

  @media (max-width: 960px) {
    .v-card-actions {
      flex-direction: column;
      gap: 12px;
      align-items: flex-end;

      >div:first-child {
        width: 100%;
        justify-content: flex-end;
      }
    }
  }
}
</style>

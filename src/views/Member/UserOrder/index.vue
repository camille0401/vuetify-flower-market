<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchOrderAPI } from '@/apis/order'
import { useToast } from 'vue-toastification'

const toast = useToast()

// 订单状态选项卡
const tab = ref('all')
const tabTypes = [
  { name: "all", label: "全部订单", state: '' },
  { name: "deliver", label: "待发货", state: '0' },
  { name: "unpay", label: "待付款", state: '1' },
  { name: "receive", label: "待收货", state: '2' },
  { name: "complete", label: "已完成", state: '3' },
  { name: "cancel", label: "已取消", state: '4' },
  { name: "refund", label: "已退款", state: '5' },
]

// 订单状态映射
const orderStateMap = {
  0: { text: '待发货', color: 'info' },
  1: { text: '待付款', color: 'warning' },
  2: { text: '待收货', color: 'primary' },
  3: { text: '已完成', color: 'success' },
  4: { text: '已取消', color: 'error' },
  5: { text: '已退款', color: 'success' },
}

// 订单数据
const orderList = ref([])
const loading = ref(false)
// const pagination = ref({
//   page: 1,
//   pageSize: 5,
//   total: 0
// })

// 获取订单列表
const fetchOrderList = async () => {
  try {
    loading.value = true
    const params = {
      orderStatus: tabTypes.find(t => t.name === tab.value)?.state || '',
    }
    const res = await fetchOrderAPI(params)
    orderList.value = res || []
    // pagination.value.total = res.result.counts || 0
  } catch (error) {
    // toast.error('获取订单列表失败')
    loading.value = false
    console.error('获取订单列表失败:', error)
  } finally {
    loading.value = false
  }
}



// 切换选项卡
const handleTabChange = () => {
  if (tab.value === 'all') {

  }
  // pagination.value.page = 1
  fetchOrderList()
}

// 分页变化
const handlePageChange = (page) => {
  fetchOrderList()
}

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleString()
}

// 计算订单总价
const calculateTotal = (orderlist) => {
  return orderlist.reduce((sum, item) => sum + (item.price * item.count), 0).toFixed(2)
}

onMounted(() => fetchOrderList())
</script>

<template>
  <v-card class="pa-4" rounded="lg" flat>
    <v-card-title class="text-h5 font-weight-bold mb-4">我的订单</v-card-title>

    <!-- 订单状态选项卡 -->
    <v-tabs v-model="tab" color="primary" @update:modelValue="handleTabChange">
      <v-tab v-for="tab in tabTypes" :key="tab.name" :value="tab.name">
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <!-- 加载状态 -->
    <v-progress-linear v-if="loading" indeterminate color="primary" />

    <!-- 订单列表 -->
    <div class="mt-10">
      <v-card v-for="order in orderList" :key="order.id" class="mb-6" flat outlined>
        <!-- 订单头部 -->
        <v-card-title class="d-flex justify-space-between align-center bg-grey-lighten-4">
          <div>
            <span class="mr-4">订单编号: {{ order.id }}</span>
            <span>下单时间: {{ formatTime(order.createdAt) }}</span>
          </div>
          <v-chip :color="orderStateMap[order.status]?.color" size="small">
            {{ orderStateMap[order.status]?.text }}
          </v-chip>
        </v-card-title>

        <!-- 订单商品 -->
        <v-card-text>
          <v-row class="py-4" align="center">
            <v-col cols="2">
              <v-img :src="order.image" height="80" contain />
            </v-col>
            <v-col cols="5">
              <div class="text-body-1 font-weight-medium">{{ order.name }}</div>
              <div class="text-caption text-grey">{{ order.attrsText }}</div>
            </v-col>
            <v-col cols="2" class="text-center">
              <div class="text-body-1">¥{{ order.price }}</div>
            </v-col>
            <v-col cols="1" class="text-center">
              <div class="text-body-1">x{{ order.count }}</div>
            </v-col>
            <v-col cols="2" class="text-right">
              <div class="text-body-1">¥{{ (order.price * order.count).toFixed(2) }}</div>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- 订单底部 -->
        <v-divider />
        <v-card-actions class="d-flex justify-end">
          <!-- <div class="d-flex align-center mr-4">
            <span class="text-body-1 mr-2">共 {{ orderList.length }} 件商品，合计：</span>
            <span class="text-h6 text-error">¥{{ calculateTotal(orderList) }}</span>
          </div> -->

          <template v-if="order.status === 0">
            <v-btn color="error" variant="text" @click="cancelOrder(order.id)">取消订单</v-btn>
            <!-- <v-btn color="primary" @click="payOrder(order.id)">去支付</v-btn> -->
          </template>

          <template v-else-if="order.orderState === 2">
            <v-btn color="primary" variant="outlined" @click="confirmReceipt(order.id)">确认收货</v-btn>
          </template>

          <v-btn v-else color="primary" variant="text" @click="viewOrderDetail(order.id)">查看详情</v-btn>
        </v-card-actions>
      </v-card>

      <!-- 分页 -->
      <!-- <v-pagination v-model="pagination.page" :length="Math.ceil(pagination.total / pagination.pageSize)"
        :total-visible="7" @update:modelValue="handlePageChange" class="mt-6" /> -->
    </div>

    <!-- 空状态 -->
    <v-alert type="info" variant="tonal" class="my-6">
      暂无订单数据
      <template v-slot:append>
        <v-btn color="primary" variant="text" to="/">去逛逛</v-btn>
      </template>
    </v-alert>
  </v-card>
</template>

<style lang="scss" scoped>
.order-card {
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.v-card-actions {
  padding: 16px;
}
</style>

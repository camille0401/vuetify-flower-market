<template>
  <div class="fs-settlement-page">
    <div class="container pb-10">
      <!-- 主卡片区域 -->
      <v-card elevation="2" rounded="lg">
        <!-- 收货地址部分 -->
        <v-card-item class="pa-6">
          <div class="d-flex justify-space-between align-center mb-4">
            <h3 class="text-h6 font-weight-bold">收货人信息</h3>
            <div class="d-flex ga-4">
              <v-btn color="primary" prepend-icon="mdi-pen-plus" @click="openCreateDialog">
                添加地址
              </v-btn>
              <v-btn color="primary" prepend-icon="mdi-swap-horizontal" @click="switchDialog = true">
                切换地址
              </v-btn>
            </div>
          </div>

          <v-divider class="mb-4" />

          <div class="address-card" :class="{ 'empty-address': !activeAddress }">
            <div v-if="!activeAddress" class="empty-address-message">
              <v-icon size="large" color="grey-lighten-1">mdi-map-marker-off</v-icon>
              <p class="text-body-1 mt-2">您需要先添加收货地址才可提交订单</p>
            </div>

            <template v-else>
              <div class="address-content">
                <div class="address-info">
                  <div class="d-flex align-center mb-2">
                    <span class="text-body-1 font-weight-medium mr-2">收货人：</span>
                    <span class="text-body-1">{{ activeAddress.recipient }}</span>
                    <v-chip v-if="activeAddress.isDefault" color="error" size="small" class="ml-2">
                      默认
                    </v-chip>
                  </div>
                  <div class="text-body-1 mb-2">
                    <span class="font-weight-medium mr-2">联系方式：</span>
                    <span>{{ activeAddress.phone }}</span>
                  </div>
                  <div class="text-body-1">
                    <span class="font-weight-medium mr-2">收货地址：</span>
                    <span>{{ fullAddress }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </v-card-item>

        <!-- 商品信息部分 -->
        <v-card-item class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4">商品信息</h3>
          <v-divider class="mb-4" />

          <v-table class="product-table">
            <thead>
              <tr>
                <th class="text-left">商品信息</th>
                <th class="text-center">单价</th>
                <th class="text-center">数量</th>
                <th class="text-center">小计</th>
                <th class="text-center">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkInfo.goods" :key="item.id">
                <td>
                  <div class="d-flex align-center">
                    <v-img :src="item.picture" width="80" height="80" cover class="mr-4 rounded-lg"></v-img>
                    <div>
                      <p class="text-body-1 font-weight-medium">{{ item.name }}</p>
                      <p class="text-caption text-grey">{{ item.attrsText }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-center">¥{{ item.price }}</td>
                <td class="text-center">{{ item.count }}</td>
                <td class="text-center">¥{{ item.totalPrice }}</td>
                <td class="text-center">¥{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-item>

        <!-- 配送时间部分 -->
        <v-card-item class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4">配送时间</h3>
          <v-divider class="mb-4" />

          <v-chip-group v-model="deliveryTime" mandatory>
            <v-chip v-for="time in deliveryTimes" :key="time.value" :value="time.value" color="primary"
              variant="outlined" class="px-4 py-2">
              {{ time.label }}
            </v-chip>
          </v-chip-group>
        </v-card-item>

        <!-- 支付方式部分 -->
        <v-card-item class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4">支付方式</h3>
          <v-divider class="mb-4" />

          <v-chip-group v-model="paymentMethod" mandatory>
            <v-chip v-for="method in paymentMethods" :key="method.value" :value="method.value" color="primary"
              variant="outlined" class="px-4 py-2">
              {{ method.label }}
            </v-chip>
          </v-chip-group>
        </v-card-item>

        <!-- 金额明细部分 -->
        <v-card-item class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4">金额明细</h3>
          <v-divider class="mb-4" />

          <div class="price-summary">
            <div class="price-item">
              <span class="label">商品件数：</span>
              <span class="value">{{ checkInfo.summary?.goodsCount }}件</span>
            </div>
            <div class="price-item">
              <span class="label">商品总价：</span>
              <span class="value">¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="price-item">
              <span class="label">运费：</span>
              <span class="value">¥{{ checkInfo.summary?.postFee.toFixed(2) }}</span>
            </div>
            <div class="price-item total">
              <span class="label">应付总额：</span>
              <span class="value">¥{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</span>
            </div>
          </div>
        </v-card-item>

        <!-- 操作按钮 -->
        <v-divider />
        <v-card-item class="pa-6">
          <div class="d-flex justify-end ga-4">
            <v-btn color="primary" variant="outlined" size="x-large" @click="goBack">
              返回
            </v-btn>
            <v-btn color="primary" size="x-large" :disabled="!activeAddress" @click="submitOrder">
              提交订单
            </v-btn>
          </div>
        </v-card-item>
      </v-card>
    </div>

    <!-- 添加地址对话框 -->
    <v-dialog v-model="editDialog" max-width="600">
      <AddressForm :initial-data="selectedAddress" @submit="handleSubmit" @close="editDialog = false" />
    </v-dialog>

    <!-- 切换地址对话框 -->
    <v-dialog v-model="switchDialog" max-width="600">
      <AddressList :list="addressStore.addressList" :active-address="activeAddress" @switch-address="switchAddress"
        @close="switchDialog = false" />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAddressStore } from '@/stores/address'
import { useAddressForm } from '@/composables/useAddressForm'
import AddressForm from '@/views/Member/UserAddress/components/AddressForm.vue'
import AddressList from './components/AddressList.vue'

const toast = useToast()
const router = useRouter()
const addressStore = useAddressStore()

// 地址表单相关
const { editDialog, selectedAddress, openCreateDialog, handleSubmit } = useAddressForm()

// 组件状态
const checkInfo = ref({}) // 订单对象
const switchDialog = ref(false)
const deliveryTime = ref('anytime')
const paymentMethod = ref('online')

// 配送时间选项
const deliveryTimes = [
  { value: 'anytime', label: '不限送货时间：周一至周日' },
  { value: 'weekday', label: '工作日送货：周一至周五' },
  { value: 'weekend', label: '双休日、假日送货：周六至周日' }
]

// 支付方式选项
const paymentMethods = [
  { value: 'online', label: '在线支付' },
  { value: 'cod', label: '货到付款(货到付款需付5元手续费)' }
]

// 计算属性
const activeAddress = computed(() => {
  return addressStore.addressList.find(item => item.isDefault === 1) || null
})

const fullAddress = computed(() => {
  if (!activeAddress.value) return ''
  const { prefecture, city, address } = activeAddress.value
  return `${prefecture}${city}${address}`
})

// 方法
const switchAddress = (address) => {
  // 实现切换地址逻辑
  switchDialog.value = false
  toast.success('已切换收货地址')
}

const submitOrder = () => {
  if (!activeAddress.value) {
    toast.warning('请先选择收货地址')
    return
  }
  // 提交订单逻辑
  toast.success('订单提交成功')
  router.push('/order/success')
}

const goBack = () => {
  router.go(-1)
}

// 生命周期
onMounted(() => {
  // 初始化订单数据
  // fetchCheckInfo()
})
</script>

<style lang="scss" scoped>
.fs-settlement-page {

  .address-card {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px;
    padding: 16px;
    transition: all 0.3s ease;

    &.empty-address {
      background-color: rgba(0, 0, 0, 0.02);
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .empty-address-message {
      text-align: center;
      color: rgb(var(--v-theme-text-secondary));
    }

    .address-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .address-info {
        flex: 1;
      }
    }
  }

  .product-table {
    :deep(thead tr th) {
      font-weight: 600;
      background-color: rgba(0, 0, 0, 0.02);
    }

    :deep(tbody tr:hover) {
      background-color: rgba(0, 0, 0, 0.01);
    }
  }

  .price-summary {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    max-width: 500px;
    margin-left: auto;

    .price-item {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .label {
        color: rgb(var(--v-theme-text-secondary));
      }

      .value {
        min-width: 120px;
        text-align: right;
      }

      &.total {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px dashed rgba(var(--v-border-color), var(--v-border-opacity));

        .label,
        .value {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--v-theme-primary);
        }
      }
    }
  }

  @media (max-width: 960px) {
    .address-card {
      .address-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }

    .product-table {
      overflow-x: auto;

      table {
        min-width: 800px;
      }
    }
  }
}
</style>

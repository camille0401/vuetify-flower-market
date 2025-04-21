<template>
  <div class="fs-checkout-page">
    <div class="container pb-10">
      <!-- 主卡片区域 -->
      <v-card elevation="2" rounded="lg">
        <!-- 收货地址部分 -->
        <v-card-item class="pa-6">
          <div class="d-flex justify-space-between align-center mb-4">
            <h3 class="text-h6 font-weight-bold">{{ $t('order.checkout.addressTitle') }}</h3>
            <div class="d-flex ga-4">
              <v-btn color="primary-darken-1" prepend-icon="mdi-pen-plus" @click="openCreateDialog">
                {{ $t('order.checkout.addAddressBtn') }}
              </v-btn>
              <v-btn color="primary-darken-1" prepend-icon="mdi-swap-horizontal" @click="switchDialog = true">
                {{ $t('order.checkout.switchAddressBtn') }}
              </v-btn>
            </div>
          </div>

          <v-divider class="mb-4" />

          <div class="address-card" :class="{ 'empty-address': !activeAddress }">
            <div v-if="!activeAddress" class="empty-address-message">
              <v-icon size="large" color="grey-lighten-1">mdi-map-marker-off</v-icon>
              <p class="text-body-1 mt-2">{{ $t('order.checkout.emptyAddress') }}</p>
            </div>

            <template v-else>
              <div class="address-content">
                <div class="address-info">
                  <div class="d-flex align-center mb-2">
                    <span class="text-body-1 font-weight-medium mr-2">{{ $t('order.checkout.recipient') }}</span>
                    <span class="text-body-1">{{ activeAddress.recipient }}</span>
                    <v-chip v-if="activeAddress.isDefault" color="error" size="small" class="ml-2">
                      {{ $t('order.checkout.defaultAddressChip') }}
                    </v-chip>
                  </div>
                  <div class="text-body-1 mb-2">
                    <span class="font-weight-medium mr-2">{{ $t('order.checkout.contact') }}</span>
                    <span>{{ activeAddress.phone }}</span>
                  </div>
                  <div class="text-body-1">
                    <span class="font-weight-medium mr-2">{{ $t('order.checkout.fullAddress') }}</span>
                    <span>{{ fullAddress }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </v-card-item>

        <!-- 商品信息部分 -->
        <v-card-item class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4">{{ $t('order.checkout.productInfo') }}</h3>
          <v-divider class="mb-4" />

          <v-table class="product-table">
            <thead>
              <tr>
                <th class="text-left">{{ $t('order.checkout.table.product') }}</th>
                <th class="text-center">{{ $t('order.checkout.table.price') }}</th>
                <th class="text-center">{{ $t('order.checkout.table.count') }}</th>
                <th class="text-center">{{ $t('order.checkout.table.amount') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in goodsList" :key="item.id">
                <td>
                  <div class="d-flex align-center">
                    <div style="width: 80px; height: 80px;" class="mr-4 rounded-lg">
                      <v-img :src="item.picture" width="80" height="80" cover />
                    </div>
                    <div>
                      <p class="text-body-1 font-weight-medium">{{ item.name }}</p>
                      <p class="text-caption text-grey">{{ item.attrsText }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-center">{{ $t('order.checkout.table.priceTemplate', { price: item.price }) }}</td>
                <td class="text-center">{{ 'X' + item.goodsCount }}</td>
                <td class="text-center text-error">
                  {{ $t('order.checkout.table.amountTemplate', { amount: item.totalPayAmount }) }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-item>

        <!-- 配送时间部分 -->
        <v-card-item class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4">{{ $t('order.checkout.deliveryDate') }}</h3>
          <v-divider class="mb-4" />

          <div class="cursor-pointer" @click="deliveryTimeDialog = true">
            <div class="selected-info">
              <v-icon color="primary" class="mr-2">mdi-calendar-check</v-icon>
              <span>{{ selectedDateDisplay }}</span>
            </div>
          </div>
        </v-card-item>

        <!-- 金额明细部分 -->
        <v-card-item class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4">{{ $t('order.checkout.totalDetail') }}</h3>
          <v-divider class="mb-4" />

          <div class="price-summary">
            <div class="price-item">
              <span class="label">{{ $t('order.checkout.goodsCount') }}</span>
              <span class="value">{{ $t('order.checkout.goodsCountTemplate', { count: summary?.goodsCount }) }}</span>

            </div>
            <div class="price-item">
              <span class="label">{{ $t('order.checkout.totalAmount') }}</span>
              <span class="value">
                {{ $t('order.checkout.totalAmountTemplate', { amount: summary?.totalAmount }) }}
              </span>
            </div>
            <!-- <div class="price-item">
              <span class="label">配送料：</span>
              <span class="value">¥{{ summary?.postFee }}</span>
            </div> -->
            <div class="price-item total">
              <span class="label">{{ $t('order.checkout.totalPayAmount') }}</span>
              <span class="value text-error">
                {{ $t('order.checkout.totalPayAmountTemplate', { amount: summary?.totalPayAmount }) }}
              </span>
            </div>
          </div>
        </v-card-item>

        <!-- 操作按钮 -->
        <v-divider />
        <v-card-item class="pa-6">
          <div class="d-flex justify-end ga-4">
            <v-btn variant="text" size="x-large" @click="goBack">
              {{ $t('order.checkout.backBtn') }}
            </v-btn>
            <v-btn color="primary-darken-1" size="x-large" prepend-icon="mdi-check" :disabled="!activeAddress"
              @click="submitOrder">
              {{ $t('order.checkout.submitOrderBtn') }}
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

    <!-- 配送日期对话框 -->
    <v-dialog v-model="deliveryTimeDialog" max-width="600">
      <DeliveryDate :initial-date="deliveryTime" @close="deliveryTimeDialog = false" @selected="selectedDeliveryTime" />
    </v-dialog>
  </div>
</template>

<script setup>
import AddressForm from '@/views/Member/UserAddress/components/AddressForm.vue'
import AddressList from '@/views/Member/UserAddress/components/AddressList.vue'
import DeliveryDate from './components/DeliveryDate.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { createOrderAPI } from '@/apis/order'
import { useAddressStore } from '@/stores/address'
import { useCartStore } from '@/stores/cart'
import { useAddressForm } from '@/composables/useAddressForm'
import { useOrderDraft } from '@/composables/useOrderDraft'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

const { t } = useI18n()

const toast = useToast()
const router = useRouter()
const addressStore = useAddressStore()
const cartStore = useCartStore()


// 地址表单相关
const { editDialog, selectedAddress, openCreateDialog, handleSubmit } = useAddressForm()
// 草稿订单相关
const { goodsList, summary, loadDraft, clearDraft } = useOrderDraft()

// 组件状态
const switchDialog = ref(false)
const deliveryTimeDialog = ref(false)
const deliveryTime = ref(dayjs().add(2, 'day').format('YYYY-MM-DD')) // 默认2天后
const activeAddress = ref(addressStore.addressList.find(item => item.isDefault === 1) || {})

// 计算属性
const fullAddress = computed(() => {
  if (!activeAddress.value) return ''
  const { prefecture, city, address } = activeAddress.value
  return `${prefecture}${city}${address}`
})

// 表示用の選択日付
const selectedDateDisplay = computed(() => {
  if (!deliveryTime.value) return t('order.checkout.common.deliveryTimeFailedMessage')
  return dayjs(deliveryTime.value).format('YYYY年M月D日 (ddd)')
})

// 方法
const switchAddress = (address) => {
  console.log(address)
  activeAddress.value = address
  switchDialog.value = false
  toast.success(t('order.checkout.common.switchAddressMessage'))
}

const submitOrder = async () => {
  if (!activeAddress.value) {
    toast.warning(t('order.checkout.common.submitOrderNoAddMessage'))
    return
  }

  try {
    const params = {
      addressId: activeAddress.value.id,
      deliveryTime: deliveryTime.value,
      items: goodsList.map(item => ({
        goodsCount: item.goodsCount,
        goodsId: item.goodsId
      })),
      totalAmount: summary?.totalAmount
    }
    const res = await createOrderAPI(params)
    if (res) {
      // 跳转到订单详情界面
      router.push('/order/detail/' + res)
      // 清空订单数据
      clearDraft()
      // 查询购物车列表，更新购物车
      await cartStore.getCartList()

    }
  } catch (error) {
    // toast.error('注文の確定中にエラーが発生しました')
    console.error('Order submission error:', error)
  }
}

const goBack = () => {
  router.go(-1)
}

const selectedDeliveryTime = (date) => {
  deliveryTime.value = dayjs(date).format('YYYY-MM-DD')
  deliveryTimeDialog.value = false
}

// 生命周期  地址
onMounted(async () => {
  if (addressStore.addressList.length === 0) {
    addressStore.fetchAddresses()
  }
})

// // 订单
// onMounted(() => {
//   const draft = loadDraft()
//   if (draft) {
//     console.log('加载草稿订单：', draft)
//   }
// })
</script>

<style lang="scss" scoped>
.fs-checkout-page {
  .selected-info {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    color: #333;
    padding: 8px 12px;
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      border-color: rgb(var(--v-theme-primary));
    }
  }

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
      color: var(--v-theme-text-secondary);
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

    :deep(td),
    :deep(th) {
      padding: 12px 8px;
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
        color: var(--v-theme-text-secondary);
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
        min-width: 600px;
      }
    }

    .price-summary {
      max-width: 100%;
    }
  }
}
</style>

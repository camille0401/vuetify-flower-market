<template>
  <section class="fs-checkout-page">
    <v-container class="mx-auto pb-10">
      <!-- 主卡片区域 -->
      <v-sheet color="surface" class="pa-4 mb-4" elevation="2">
        <FSTitlePanel :title="$t('order.checkout.addressTitle')">
          <template #action>
            <div class="d-flex ga-4">
              <v-btn color="primary-darken-1" prepend-icon="mdi-pen-plus" @click="openCreateDialog">
                {{ $t('order.checkout.addAddressBtn') }}
              </v-btn>
              <v-btn color="primary-darken-1" prepend-icon="mdi-swap-horizontal" @click="switchDialog = true">
                {{ $t('order.checkout.switchAddressBtn') }}
              </v-btn>
            </div>
          </template>
        </FSTitlePanel>
        <div class="address-card mb-6" :class="{ 'empty-address': !activeAddress }">
          <div v-if="!activeAddress" class="empty-address-message">
            <v-icon size="large" color="grey-lighten-1">mdi-map-marker-off</v-icon>
            <p class="text-body-1 mt-2">{{ $t('order.checkout.emptyAddress') }}</p>
          </div>

          <div v-else class="address-content">
            <div class="address-info">
              <div class="d-flex align-center mb-2">
                <span class="text-body-1 font-weight-medium mr-2">{{ $t('order.checkout.recipient') }}</span>
                <span class="text-body-1">{{ activeAddress?.recipient }}</span>
                <v-chip v-if="activeAddress?.isDefault" color="error" size="small" class="ml-2">
                  {{ $t('order.checkout.defaultAddressChip') }}
                </v-chip>
              </div>
              <div class="text-body-1 mb-2">
                <span class="font-weight-medium mr-2">{{ $t('order.checkout.contact') }}</span>
                <span>{{ activeAddress?.phone }}</span>
              </div>
              <div class="text-body-1">
                <span class="font-weight-medium mr-2">{{ $t('order.checkout.fullAddress') }}</span>
                <span>{{ fullAddress }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 商品信息部分 -->
        <FSTitlePanel :title="$t('order.checkout.productInfo')" />
        <v-table class="product-table mb-6">
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
              <td class="text-center">{{ $t('global.moneyTemplate', { money: item.price }) }}</td>
              <td class="text-center">{{ $t('global.countTemplate', { count: item.goodsCount })
              }}</td>
              <td class="text-center text-error">
                {{ $t('global.moneyTemplate', { money: item.totalPayAmount }) }}
              </td>
            </tr>
          </tbody>
        </v-table>

        <!-- 配送时间部分 -->
        <FSTitlePanel :title="$t('order.checkout.deliveryDate')" />
        <div class="cursor-pointer mb-6" @click="deliveryTimeDialog = true">
          <div class="selected-info">
            <v-icon color="primary" class="mr-2">mdi-calendar-check</v-icon>
            <span>{{ selectedDateDisplay }}</span>
          </div>
        </div>

        <!-- 金额明细部分 -->
        <FSTitlePanel :title="$t('order.checkout.totalDetail')" />
        <div class="price-summary mb-6">
          <div class="price-item">
            <span class="label">{{ $t('order.checkout.goodsCount') }}</span>
            <span class="value">{{ $t('global.countTemplate', { count: summary?.goodsCount }) }}</span>

          </div>
          <div class="price-item">
            <span class="label">{{ $t('order.checkout.totalAmount') }}</span>
            <span class="value">
              {{ $t('global.moneyTemplate', { money: summary?.totalAmount }) }}
            </span>
          </div>
          <!-- <div class="price-item">
            <span class="label">配送料：</span>
            <span class="value">¥{{ summary?.postFee }}</span>
          </div> -->
          <div class="price-item total">
            <span class="label">{{ $t('order.checkout.totalPayAmount') }}</span>
            <span class="value text-error">
              {{ $t('global.moneyTemplate', { money: summary?.totalPayAmount }) }}
            </span>
          </div>
        </div>
        <v-divider class="my-4" />
        <div class="action-buttons">
          <v-btn class="flex-grow-1" color="primary" variant="outlined" size="large" prepend-icon="mdi-arrow-left"
            @click="goBack">
            {{ $t('order.checkout.backBtn') }}
          </v-btn>
          <v-btn class="flex-grow-1" color="primary" size="large" prepend-icon="mdi-check" :loading="loading"
            @click="submitOrder">
            {{ $t('order.checkout.submitOrderBtn') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-container>

    <!-- 添加地址对话框 -->
    <v-dialog v-model="editDialog" max-width="600" :fullscreen="mobile" persistent>
      <AddressForm :initial-data="selectedAddress" @submit="handleSubmit" @close="editDialog = false" />
    </v-dialog>

    <!-- 切换地址对话框 -->
    <v-dialog v-model="switchDialog" max-width="600" :fullscreen="mobile" persistent>
      <AddressList :list="addressStore.addressList" :active-address="activeAddress" @switch-address="switchAddress"
        @close="switchDialog = false" />
    </v-dialog>

    <!-- 配送日期对话框 -->
    <v-dialog v-model="deliveryTimeDialog" max-width="600" :fullscreen="mobile" persistent>
      <DeliveryDate :initial-date="deliveryTime" @close="deliveryTimeDialog = false" @selected="selectedDeliveryTime" />
    </v-dialog>
  </section>
</template>

<script setup>
import FSTitlePanel from '@/components/FSTitlePanel/index.vue'
import AddressForm from '@/views/Member/UserAddress/components/AddressForm.vue'
import AddressList from '@/views/Member/UserAddress/components/AddressList.vue'
import DeliveryDate from './components/DeliveryDate.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import 'dayjs/locale/zh-cn'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { createOrderAPI } from '@/apis/order'
import { useAddressStore } from '@/stores/address'
import { useCartStore } from '@/stores/cart'
import { useAddressForm } from '@/composables/useAddressForm'
import { useOrderDraft } from '@/composables/useOrderDraft'
import { useI18n } from 'vue-i18n'
import { useDisplay } from "vuetify"

const { mobile } = useDisplay()
const { t, locale } = useI18n()

const toast = useToast()
const router = useRouter()
const addressStore = useAddressStore()
const cartStore = useCartStore()


// 地址表单相关
const { editDialog, selectedAddress, openCreateDialog, handleSubmit } = useAddressForm()
// 草稿订单相关
const { goodsList, summary, loadDraft, clearDraft } = useOrderDraft()

// 组件状态
const loading = ref(false)
const switchDialog = ref(false)
const deliveryTimeDialog = ref(false)
const deliveryTime = ref(dayjs().add(1, 'day').format('YYYY-MM-DD')) // 默认2天后
const activeAddress = ref(null)


// 计算属性
const fullAddress = computed(() => {
  if (!activeAddress.value) return ''
  const { prefecture = '', city = '', address = '' } = activeAddress.value
  return `${prefecture}${city}${address}`
})

// 配送日期
const selectedDateDisplay = computed(() => {
  if (!deliveryTime.value) return t('order.checkout.common.deliveryTimeFailedMessage')

  // 设置 dayjs 当前语言
  const currentLocale = locale.value === 'zh-CN' ? 'zh-cn' : locale.value

  dayjs.locale(currentLocale)

  const formatString = currentLocale === 'ja' ? 'YYYY年M月D日 (ddd)' : 'YYYY年M月D日 dddd'

  return dayjs(deliveryTime.value).format(formatString)
})

// 方法
const switchAddress = (address) => {
  console.log(address)
  activeAddress.value = address
  switchDialog.value = false
  toast.success(t('order.checkout.common.switchAddressMessage'))
}

const selectedDeliveryTime = (date) => {
  deliveryTime.value = dayjs(date).format('YYYY-MM-DD')
  deliveryTimeDialog.value = false
}

const submitOrder = async () => {
  if (!activeAddress.value?.id) {
    toast.warning(t('order.checkout.common.submitOrderNoAddMessage'))
    return
  }

  loading.value = true

  const params = {
    addressId: activeAddress.value.id,
    deliveryTime: deliveryTime.value,
    items: goodsList.map(({ goodsCount, goodsId }) => ({ goodsCount, goodsId })),
    totalAmount: summary?.totalAmount ?? 0
  }

  try {
    const res = await createOrderAPI(params)
    if (res) {
      router.push(`/order/detail/${res}`)
      clearDraft()
      await cartStore.getCartList()
    }
  } catch (error) {
    console.error('Order submission error:', error)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

watch(
  () => addressStore.addressList,
  (newList) => {
    const def = newList.find(item => item.isDefault === 1) || newList[0];
    activeAddress.value = def;
  },
  { deep: true, immediate: true }
);


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

  .action-buttons {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  // 📱 小屏幕优化
  @media (max-width: 600px) {
    .product-table {

      th,
      td {
        font-size: 14px;
      }

      td>.d-flex {
        flex-direction: column;
        align-items: flex-start !important;

        .v-img {
          margin-bottom: 6px;
        }
      }
    }

    .selected-info {
      font-size: 14px;
      align-items: center;
    }

    .price-summary .price-item.total {
      font-size: 16px;
    }

    .action-buttons {
      grid-template-columns: 1fr;
    }
  }

}
</style>

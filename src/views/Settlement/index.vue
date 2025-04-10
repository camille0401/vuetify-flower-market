<template>
  <div class="fs-settlement-page mt-10 mb-10">
    <div class="container">
      <v-hover v-slot="{ isHovering, props }">
        <v-card class="pb-4" v-bind="props" :elevation="isHovering ? 10 : 2">
          <v-card-item>
            <v-card-title>
              <div class="d-flex justify-space-between align-center	pa-2">
                <span class="text-subtitle-1 font-weight-bold">收货人信息</span>
                <div class="d-flex">
                  <v-btn class="mr-2" color="primary" @click="openCreateDialog"><v-icon
                      class="mr-2">mdi-pen-plus</v-icon>添加地址</v-btn>
                  <v-btn color="primary" @click="switchDialog = true">
                    <v-icon class="mr-2">mdi-swap-horizontal</v-icon>
                    切换地址
                  </v-btn>
                </div>
              </div>
            </v-card-title>
            <v-divider class="border-opacity-30"></v-divider>
            <v-card-text>
              <div class="address">
                <div class="text">
                  <div v-if="!activeAddress" class="none">您需要先添加收货地址才可提交订单。</div>
                  <ul v-else>
                    <li><span>收<i />货<i />人：</span>刘xx
                      <v-chip class="ml-4" color="red">默认</v-chip>
                    </li>
                    <li><span>联系方式：</span>186576767</li>
                    <li><span>收货地址：</span>浙江省杭州市余杭区</li>
                  </ul>
                </div>
              </div>
            </v-card-text>
          </v-card-item>
          <v-card-item>
            <v-card-title>
              <div class="pa-2 bg-surface">
                <span class="text-subtitle-1 font-weight-bold">收货人信息</span>
              </div>
            </v-card-title>
            <v-divider class="border-opacity-30"></v-divider>
            <v-card-text>
              <table class="goods">
                <thead>
                  <tr>
                    <th width="520">商品信息</th>
                    <th width="170">单价</th>
                    <th width="170">数量</th>
                    <th width="170">小计</th>
                    <th width="170">实付</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in checkInfo.goods" :key="i.id">
                    <td>
                      <a href="javascript:;" class="info">
                        <img :src="i.picture" alt="">
                        <div class="right">
                          <p>{{ i.name }}</p>
                          <p>{{ i.attrsText }}</p>
                        </div>
                      </a>
                    </td>
                    <td>&yen;{{ i.price }}</td>
                    <td>{{ i.price }}</td>
                    <td>&yen;{{ i.totalPrice }}</td>
                    <td>&yen;{{ i.totalPayPrice }}</td>
                  </tr>
                </tbody>
              </table>
            </v-card-text>
          </v-card-item>
          <v-card-item>
            <v-card-title>
              <div class="pa-2 bg-surface">
                <span class="text-subtitle-1 font-weight-bold">配送时间</span>
              </div>
            </v-card-title>
            <v-divider class="border-opacity-30"></v-divider>
            <v-card-text>
              <v-chip-group filter>
                <v-chip color="primary" rounded="sm" variant="outlined">不限送货时间：周一至周日</v-chip>
                <v-chip color="primary" rounded="sm" variant="outlined">工作日送货：周一至周五</v-chip>
                <v-chip color="primary" rounded="sm" variant="outlined">双休日、假日送货：周六至周日</v-chip>
              </v-chip-group>
              <!-- <v-date-picker></v-date-picker> -->
            </v-card-text>
          </v-card-item>
          <v-card-item>
            <v-card-title>
              <div class="pa-2 bg-surface">
                <span class="text-subtitle-1 font-weight-bold">支付方式</span>
              </div>
            </v-card-title>
            <v-divider class="border-opacity-30"></v-divider>
            <v-card-text>
              <v-chip-group filter>
                <v-chip color="primary" rounded="sm" variant="outlined">在线支付</v-chip>
                <v-chip color="primary" rounded="sm" variant="outlined">货到付款(货到付款需付5元手续费)</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card-item>
          <v-card-item>
            <v-card-title>
              <div class="pa-2 bg-surface">
                <span class="text-subtitle-1 font-weight-bold">金额明细</span>
              </div>
            </v-card-title>
            <v-divider class="border-opacity-30"></v-divider>
            <v-card-text>
              <div class="total">
                <dl>
                  <dt>商品件数：</dt>
                  <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
                </dl>
                <dl>
                  <dt>商品总价：</dt>
                  <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
                </dl>
                <dl>
                  <dt>运<i></i>费：</dt>
                  <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
                </dl>
                <dl>
                  <dt>应付总额：</dt>
                  <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
                </dl>
              </div>
            </v-card-text>
          </v-card-item>
          <v-card-item>
            <v-divider class="border-opacity-30"></v-divider>
          </v-card-item>
          <v-card-item>
            <div class="d-flex justify-end ga-4">
              <v-btn color="primary" variant="outlined" size="x-large">返回</v-btn>
              <v-btn color="primary" variant="flat" size="x-large">提交订单</v-btn>
            </div>
          </v-card-item>
        </v-card>
      </v-hover>
    </div>
  </div>
  <!-- 添加地址对话框 -->
  <v-dialog v-model="editDialog" max-width="600">
    <AddressForm :initial-data="selectedAddress" @submit="handleSubmit" @close="editDialog = false" />
  </v-dialog>
  <!-- 切换地址对话框 -->
  <v-dialog v-model="switchDialog" max-width="600">
    <AddressList :list="addressStore.addressList" :activeAddress="activeAddress" @switchAddress="switchAddress"
      @close="switchDialog = false" />
  </v-dialog>
</template>

<script setup>
import AddressForm from '@/views/Member/UserAddress/components/AddressForm.vue';
import AddressList from './components/AddressList.vue';
import { onMounted, ref } from 'vue';
import { useAddressStore } from '@/stores/address'
import { useAddressForm } from '@/composables/useAddressForm'

const addressStore = useAddressStore()

const { editDialog, selectedAddress, openCreateDialog, handleSubmit } = useAddressForm();

// 组件状态
const checkInfo = ref({}); // 订单对象

const activeAddress = addressStore.addressList.find(item => item.isDefault === 1) || {};

const switchDialog = ref(false)
const switchAddress = (address) => {

}

</script>

<style lang="scss" scoped>
.fs-settlement-page {
  margin-top: 20px;

  .address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;

      .none {
        line-height: 90px;
        color: #999;
        text-align: center;
        width: 100%;
      }

      >ul {
        flex: 1;
        padding: 20px;

        li {
          line-height: 30px;

          span {
            margin-right: 5px;

            >i {
              width: 0.5em;
              display: inline-block;
            }
          }
        }
      }

      >a {
        color: $fs-base-color-light;
        width: 160px;
        text-align: center;
        height: 90px;
        line-height: 90px;
        border-right: 1px solid #f5f5f5;
      }
    }

    .action {
      width: 420px;
      text-align: center;

      .btn {
        width: 140px;
        height: 46px;
        line-height: 44px;
        font-size: 14px;

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  .goods {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    .info {
      display: flex;
      text-align: left;

      img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }

      .right {
        line-height: 24px;

        p {
          &:last-child {
            color: #999;
          }
        }
      }
    }

    s tr {
      th {
        background: #f5f5f5;
        font-weight: normal;
      }

      td,
      th {
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          border-left: 1px solid #f5f5f5;
        }

        &:last-child {
          border-right: 1px solid #f5f5f5;
        }
      }
    }
  }

  .total {
    dl {
      display: flex;
      justify-content: flex-end;
      line-height: 50px;

      dt {
        i {
          display: inline-block;
          width: 2em;
        }
      }

      dd {
        width: 240px;
        text-align: right;
        padding-right: 70px;

        &.price {
          font-size: 20px;
          color: $priceColor;
        }
      }
    }
  }

}
</style>

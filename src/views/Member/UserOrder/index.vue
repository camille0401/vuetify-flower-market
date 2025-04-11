<script setup>
import { getUserOrderAPI } from '@/apis/order'
import { onMounted, ref } from 'vue'

const tab = ref()
// tab列表
const tabTypes = [
  { name: "all", label: "全部订单" },
  { name: "unpay", label: "待付款" },
  { name: "deliver", label: "待发货" },
  { name: "receive", label: "待收货" },
  { name: "comment", label: "待评价" },
  { name: "complete", label: "已完成" },
  { name: "cancel", label: "已取消" }
]
// 获取订单列表
const orderList = ref([])
const total = ref(0)
const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 2
})
const getOrderList = async () => {
  const res = await getUserOrderAPI(params.value)
  orderList.value = res.result.items
  total.value = res.result.counts
}

// onMounted(() => getOrderList())

// tab切换
const tabChange = (type) => {
  console.log(type)
  params.value.orderState = type
  getOrderList()
}

// 页数切换
const pageChange = (page) => {
  console.log(page)
  params.value.page = page
  getOrderList()
}


const fomartPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成',
    6: '已取消'
  }
  return stateMap[payState]
}
</script>
<template>
  <v-card class="mx-auto pa-4" rounded="l" elevation="0" style="height: 100%;">
    <v-card-text>
      <v-tabs v-model="tab" color="primary">
        <v-tab v-for="tab in tabTypes" :key="tab.name" :value="tab.name">{{ tab.label }}</v-tab>
      </v-tabs>
      <v-divider class="ma-4"></v-divider>
      <v-alert title="开发中" type="warning"></v-alert>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: center;
}

.main-container {
  min-height: 500px;

  .holder-container {
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      >p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $fs-primary-color;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $fs-primary-color;
          }
        }
      }
    }
  }
}
</style>

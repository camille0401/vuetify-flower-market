<template>
  <div class="fs-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <v-table>
          <thead>
            <tr>
              <th width="120">
                <v-checkbox color="primary" hide-details :model-value="cartStore.cartIsAll"
                  @update:model-value="(e) => handleAllChange(e)"></v-checkbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220" style="text-align: center;">单价</th>
              <th width="180" style="text-align: center;">数量</th>
              <th width="180" style="text-align: center;">小计</th>
              <th width="140" style="text-align: center;">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="cart in cartStore.cartList" :key="cart.goodsId">
              <td>
                <v-checkbox color="primary" hide-details :model-value="cart.selected ? true : false"
                  @update:model-value="(e) => handleSingleChange(e, cart.goodsId)"></v-checkbox>
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="cart.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ cart.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ cart.price }}</p>
              </td>
              <td class="tc">
                <v-number-input v-model="cart.count" @update:modelValue="handleInput(cart)" width="100%" color="primary"
                  variant="outlined" control-variant="split" :min="0" hide-details inset>
                </v-number-input>
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (cart.price * cart.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <div>
                  <v-btn size="small" icon color="error" class="ml-2" @click="handleDelCart(cart.goodsId)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <FSEmptyPannel title="购物车列表为空">
                  <template #actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text="随便逛逛" @click="toHomePage"></v-btn>
                    <v-spacer></v-spacer>
                  </template>
                </FSEmptyPannel>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <!-- 操作栏 -->
      <div class="action" v-if="cartStore.cartList.length !== 0">
        <div class="batch">
          共 {{ cartStore.cartAllCount }} 件商品，已选择 {{ cartStore.cartSelectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.cartSelectedPrice }} </span>
        </div>
        <div class="total">
          <v-btn class="mr-4" color="error" size="large" variant="outlined" @click="handleDelAllCart">删除</v-btn>
          <v-btn color="primary" size="large" variant="flat" @click="toSettlementPage">下单结算</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="CartList">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import FSEmptyPannel from '@/components/FSEmptyPannel.vue';

const cartStore = useCartStore()

// 单个删除
const handleDelCart = (goodsId) => {
  cartStore.delCart(goodsId)
}

const handleSingleChange = (e, goodsId) => {
  cartStore.singleCheck(goodsId, e)
}

const handleAllChange = (e) => {
  cartStore.allCheck(e)
}

// 多个删除
const handleDelAllCart = () => {
  const goodsIds = cartStore.cartList.filter(item => item.selected).map(item => item.goodsId)
  if (goodsIds.length !== 0) {
    cartStore.delAllCart(goodsIds)
  }
}

const handleInput = (goods) => {
  cartStore.countChange(goods)
}

const router = useRouter();
const toSettlementPage = () => {
  router.push({ path: "/settlement" })
}
const toHomePage = () => {
  router.push({ path: "/" })
}


</script>

<style scoped lang="scss">
.fs-cart-page {
  margin-top: 20px;

  p {
    padding: 0;
    margin: 0;
  }

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 2.4rem;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .tc {
    text-align: center;

    a {
      color: $fs-base-color-light;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $fs-base-color-light;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin-top: 20px;
    background: #fff;
    height: 80px;
    font-size: 16px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      margin-right: 20px;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

}
</style>

<template>
  <div class="fs-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <el-checkbox :model-value="cartStore.cartIsAll" @change="(e) => handleAllChange(e)" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="cart in cartStore.cartList" :key="cart.id">
              <td>
                <el-checkbox :model-value="cart.selected" @change="(e) => handleSingleChange(e, cart.skuId)" />
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
                <el-input-number v-model="cart.count" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (cart.price * cart.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                    @confirm="handleDelCart(cart.skuId)">
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="toHomePage">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action" v-if="cartStore.cartList.length !== 0">
        <div class="batch">
          共 {{ cartStore.cartAllCount }} 件商品，已选择 {{ cartStore.cartSelectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.cartSelectedPrice }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="toSettlementPage">下单结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="CartList">
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const handleDelCart = (skuId) => {
  cartStore.delCart(skuId)
}
const handleSingleChange = (e, skuId) => {
  cartStore.singleCheck(skuId, e)
}

const handleAllChange = (e) => {
  cartStore.allCheck(e)
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
        font-size: 1.6rem;
        font-weight: normal;
        line-height: 5rem;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
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
    font-size: 1.6rem;
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
      font-size: 1.6rem;
      padding-left: 10px;

      .attr {
        font-size: 1.4rem;
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
    font-size: 1.6rem;

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
      font-size: 1.8rem;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 1.6rem;
    font-weight: normal;
    line-height: 5rem;
  }

}
</style>

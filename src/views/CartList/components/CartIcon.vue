<template>
  <div class="fs-cart-icon" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
    <v-badge color="error" :content="cartStore.cartList.length">
      <v-icon icon="mdi-cart"></v-icon>
    </v-badge>
    <div class="cart-dropdown" v-show="showDropdown && cartStore.cartList.length > 0">
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartStore.cartList" :key="item.goodsId">
          <RouterLink :to="'/detail/' + item.goodsId" class="item-link">
            <img :src="item.picture" :alt="item.name" class="item-image" />
            <div class="item-content">
              <p class="item-name">
                {{ item.name }}
              </p>
            </div>
            <div class="item-meta">
              <p class="item-price">¥{{ formatPrice(item.price) }}</p>
              <p class="item-count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <v-icon icon="mdi-close" @click.stop="handleDeleteCart(item.goodsId)" class="delete-icon"></v-icon>
        </div>
      </div>
      <div class="cart-footer">
        <div class="cart-summary">
          <p>共 {{ cartStore.cartAllCount }} 件商品</p>
          <p>¥{{ formatPrice(cartStore.cartAllPrice) }}</p>
        </div>
        <v-btn class="checkout-btn" size="large" color="primary" @click="toCartListPage">
          去购物车结算
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const showDropdown = ref(false)

const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('ja-JP')
}

const handleDeleteCart = (goodsId) => {
  cartStore.delCart(goodsId)
}

const toCartListPage = () => {
  router.push('/cartlist')
}
</script>

<style scoped lang="scss">
/* 颜色变量 */
$primary-color: #e53935;
$secondary-color: #666;
$bg-color: #f8f8f8;
$border-color: #eee;
$text-color: #333;
$text-light: #999;
$transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

/* 混合宏 */
@mixin ellipsis($line: 1) {
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 组件样式 */
.fs-cart-icon {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  cursor: pointer;

  &:hover {
    .cart-dropdown {
      display: flex;
      transform: none;
    }
  }
}

.cart-dropdown {
  display: none;
  flex-direction: column;
  /* 默认隐藏 */
  width: 400px;
  max-height: 400px;
  position: absolute;
  top: 100%;
  right: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  background: #fff;
  border-radius: 8px;
  transition: display 0.25s ease, transform 0.25s ease;
  transform: translateY(-20px);

  &::before {
    content: "";
    position: absolute;
    right: 20px;
    top: -8px;
    width: 16px;
    height: 16px;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.08);
    z-index: -1;
  }
}

.cart-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  scrollbar-width: thin;
  scrollbar-color: #ddd #f5f5f5;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
}

.cart-item {
  position: relative;
  padding: 12px 0;
  border-bottom: 1px solid $border-color;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);

    .delete-icon {
      opacity: 1;
      transform: translateY(-50%) scale(1) !important;
    }
  }

  .delete-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) scale(0.8);
    opacity: 0;
    transition: $transition;
    color: $secondary-color;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 4px;
    z-index: 12;

    &:hover {
      color: $primary-color;
      background: rgba(229, 57, 53, 0.1);
    }
  }

}

.item-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.item-image {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  padding: 0 12px;
  min-width: 0;
}

.item-name {
  @include ellipsis(2);
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  color: $text-color;
}

.item-meta {
  text-align: right;
  flex-shrink: 0;
}

.item-price {
  font-size: 15px;
  font-weight: 600;
  color: $primary-color;
  margin: 0;
}

.item-count {
  font-size: 13px;
  color: $text-light;
  margin-top: 4px;
}


.cart-footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $bg-color;
  border-top: 1px solid $border-color;
}

.cart-summary {
  p {
    margin: 0;
    font-size: 14px;
    color: $secondary-color;

    &:last-child {
      font-size: 18px;
      font-weight: 600;
      color: $primary-color;
      margin-top: 6px;
    }
  }
}

.checkout-btn {
  font-weight: 600;
  letter-spacing: normal;
  padding: 8px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: $transition;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>

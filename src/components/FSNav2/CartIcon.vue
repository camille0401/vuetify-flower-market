<template>
  <div class="fs-cart-icon" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
    <v-badge :content="cartStore.cartList.length || 0" color="error">
      <v-icon icon="mdi-cart"></v-icon>
    </v-badge>
    <div class="cart-dropdown" v-show="showDropdown && cartStore.cartList.length > 0">
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartStore.cartList" :key="item.goodsId">
          <RouterLink :to="'/detail/' + item.goodsId" class="item-link">
            <img :src="item.picture" :alt="item.name" class="item-image" />
            <div class="item-content">
              <p class="item-name">{{ item.name }}</p>
            </div>
            <div class="item-meta">
              <p class="item-price text-error">
                {{ $t('global.moneyTemplate', { money: formatPrice(item.price) }) }}
              </p>
              <p class="item-count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <v-icon icon="mdi-close" class="delete-icon" @click.stop="handleDeleteCart(item.goodsId)" />
        </div>
      </div>
      <div class="cart-footer elevation-4">
        <div class="cart-summary">
          <p>{{ totalItemsText }}</p>
          <p class="text-error text-h6"> {{ totalPriceText }}</p>
        </div>
        <v-btn class="checkout-btn" size="large" color="primary-darken-1" @click="toCartListPage">
          {{ $t("global.header.cartIconBtn") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const cartStore = useCartStore()
const router = useRouter()
const showDropdown = ref(false)
const { t } = useI18n()

const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('ja-JP')
}

const totalItemsText = computed(() =>
  t('global.header.cartIconTotalItems', { count: cartStore.cartAllCount })
)
const totalPriceText = computed(() =>
  t('global.moneyTemplate', { money: formatPrice(cartStore.cartAllPrice) })
)


const handleDeleteCart = (goodsId) => {
  cartStore.delCart(goodsId)
}

const toCartListPage = () => {
  router.push('/cartlist')
}


</script>

<style scoped lang="scss">
.fs-cart-icon {
  position: relative;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  cursor: pointer;

  &:hover .cart-dropdown {
    display: flex;
    transform: none;
  }
}

.cart-dropdown {
  display: none;
  flex-direction: column;
  width: 400px;
  max-height: 400px;
  position: absolute;
  top: 100%;
  right: 0;
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-20px);
  transition: all 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    right: 20px;
    top: -8px;
    width: 16px;
    height: 16px;
    background: rgb(var(--v-theme-surface));
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
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
}

.cart-item {
  position: relative;
  padding: 12px 0;
  border-bottom: 1px solid rgba(var(--v-theme-surface-variant), 0.2);
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);

    .delete-icon {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }

  .delete-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) scale(0.8);
    opacity: 0;
    transition: all 0.3s;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 4px;
    z-index: 12;

    &:hover {
      color: rgb(var(--v-theme-error));
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
}

.item-meta {
  text-align: right;
  flex-shrink: 0;
}

.item-price {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}

.item-count {
  font-size: 13px;
  opacity: 0.6;
  margin-top: 4px;
}

.cart-footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-summary {
  p {
    margin: 0;
    font-size: 14px;
  }
}

.checkout-btn {
  font-weight: 600;
  letter-spacing: normal;
  padding: 8px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>

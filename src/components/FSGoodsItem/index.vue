<template>
  <RouterLink class="goods-link" :to="`/detail/${goods.id}`">
    <div class="img-box">
      <v-img :src="goods.picture" :alt="goods.name" cover transition="scale-transition"
        :aspect-ratio="aspectRatio || '1 / 1'" :height="aspectRatio ? undefined : imgHeight" class="goods-img" />
    </div>
    <div class="content pa-3">
      <p class="name mb-1 text-h6 font-weight-medium text-truncate">{{ goods.name }}</p>
      <div class="d-flex justify-space-between align-center">
        <p class="price text-h6 text-primary-darken-2">
          {{ $t('global.moneyTemplate', { money: goods.price?.toFixed(2) }) }}
        </p>
        <v-btn icon="mdi-cart-outline" color="primary" size="small"
          @click="(event) => openAddToCartDialog(event, goods)"></v-btn>
      </div>
    </div>
  </RouterLink>

  <!-- 添加到购物车dialog -->
  <v-dialog v-model="showDialog" max-width="800" min-height="200" :fullscreen="smAndDown" persistent>
    <AddToCart :goodsId="selectedGoods?.id" @close="closeAddToCartDialog" />
  </v-dialog>
</template>

<script setup>
import AddToCart from './AddToCart.vue'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
defineProps({
  goods: {
    type: Object,
    default: () => ({}),
  },
  imgHeight: {
    type: String,
    default: '200px', // 默认图片高度可以设定为 200px
  },
  aspectRatio: {
    type: String,
    default: '1 / 1', // 默认方形
  },
})

const showDialog = ref(false)
const selectedGoods = ref(null)

const openAddToCartDialog = (event, goods) => {
  event.preventDefault() // 仅需要时阻止默认行为
  selectedGoods.value = goods
  showDialog.value = true
}


const closeAddToCartDialog = () => {
  selectedGoods.value = null
  showDialog.value = false
}

</script>

<style lang="scss" scoped>
.goods-link {
  display: block;
  height: 100%;
  text-decoration: none;
  background: #f0f0f0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0.5rem 1rem;
  transition: 0.3s cubic-bezier(0, 0, 0.5, 1);

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 2px 4px 12px;
    transform: scale3d(1.01, 1.01, 1.01) translateZ(0px);
  }

  .img-box {
    display: block;
    width: 100%;
    background: #ffffff;
    overflow: hidden;

    .v-img {
      transition: transform 0.5s;

      &:hover {
        transform: scale(1.05) translateZ(0px);
      }
    }
  }

  .content {
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(4px);

    @media (max-width: 600px) {
      padding: 0.75rem;
    }
  }
}
</style>

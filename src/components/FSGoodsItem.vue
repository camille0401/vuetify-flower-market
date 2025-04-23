<template>
  <v-sheet class="goods-item" :elevation="hover ? 4 : 2" :class="{ 'is-hover': hover }">
    <RouterLink :to="`/detail/${goods.id}`" class="goods-link" @mouseover="hover = true" @mouseleave="hover = false">
      <div class="img-box" :style="{ height: imgHeight, '--scale': hover ? 1.05 : 1 }">
        <v-img :src="goods.picture" :alt="goods.cname" cover transition="scale-transition" />
      </div>
      <div class="content pa-3">
        <p class="name text-subtitle-1 font-weight-medium mb-1">{{ goods.cname }}</p>
        <p class="price text-h6 text-primary-darken-2">
          {{ $t('global.moneyTemplate', { money: goods.price?.toFixed(2) }) }}
        </p>
      </div>
    </RouterLink>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  goods: {
    tppe: Object,
    default: () => { }
  },
  imgHeight: {
    type: String,
    default: ''
  }
})
const hover = ref(false)

</script>

<style lang="scss" scoped>
.goods-item {
  position: relative;

  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.is-hover {
    transform: translateY(-4px);
  }

  .goods-link {
    display: block;
    height: 100%;
    text-decoration: none;
    border-radius: 8px;
  }

  .img-box {
    overflow: hidden;

    :deep(.v-img) {
      transform: scale(var(--scale));
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .content {
    background: rgba(var(--v-theme-background), 0.9);
    border-radius: 8px;
    backdrop-filter: blur(4px);
  }

  .name {
    color: rgba(var(--v-theme-on-background), 0.9);
    min-height: 2.5em;
    line-height: 1.3;
  }

  .price {
    letter-spacing: -0.5px;
  }
}
</style>

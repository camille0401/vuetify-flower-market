<template>
  <RouterLink :to="`/detail/${goods.id}`" class="goods-link">
    <div class="img-box">
      <v-img :src="goods.picture" :alt="goods.cname" cover transition="scale-transition"
        :aspect-ratio="aspectRatio || '1 / 1'" :height="aspectRatio ? undefined : imgHeight" class="goods-img" />
    </div>
    <div class="content pa-3">
      <p class="name text-subtitle-1 font-weight-medium mb-1">{{ goods.cname }}</p>
      <p class="price text-h6 text-primary-darken-2">
        {{ $t('global.moneyTemplate', { money: goods.price?.toFixed(2) }) }}
      </p>
    </div>
  </RouterLink>
</template>

<script setup>

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

</script>

<style lang="scss" scoped>
.goods-link {
  display: block;
  height: 100%;
  text-decoration: none;
  transition: transform 0.3s ease;
  background: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    z-index: 2;
  }

  .img-box {
    width: 100%;
    background: #fafafa;
    overflow: visible;
    /* 防止图片阴影被裁剪 */
    border-radius: 0.5rem;

    :deep(.v-img) {
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .content {
    border-radius: 0.5rem;
    backdrop-filter: blur(4px);
    padding: 1rem;

    @media (max-width: 600px) {
      padding: 0.75rem;
    }
  }

  .name {
    color: rgba(var(--v-theme-on-background), 0.9);
    // min-height: 2.5em;
    line-height: 1.3;
    font-size: 1rem;

    @media (max-width: 600px) {
      font-size: 0.95rem;
    }
  }

  .price {
    letter-spacing: -0.5px;
    font-size: 1.125rem;

    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
}
</style>

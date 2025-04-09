<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props" :elevation="isHovering ? 5 : 2" color="background" style="height: 100%;">
      <RouterLink :to="`/detail/${goods.id}`" class="goods-item">
        <div class="img-box bg-accent">
          <img v-img-lazy="goods.picture" alt="" />
        </div>
        <p class="name ellipsis">{{ goods.cname }}</p>
        <!-- <p class="desc ellipsis">{{ goods.desc }}</p> -->
        <p class="price">10.00</p>
      </RouterLink>
    </v-card>

  </v-hover>
</template>

<script setup name="FSGoodsItem">
defineProps({
  goods: {
    tppe: Object,
    default: () => { }
  }
})
</script>

<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: all 0.5s;


  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 210px;
    margin-bottom: 10px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  p {
    margin-bottom: 10px;
    padding: 0 20px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 30px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>

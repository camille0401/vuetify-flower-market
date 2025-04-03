<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in hotList" :key="item.id">
      <img v-img-lazy="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<script setup name="DetailHot">
import { getDetailHotAPI } from "@/apis/detail"
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  hotType: {
    type: Number
  }
})

const TYPEMAP = {
  1: '24小时热榜',
  2: '周热榜'
}
const title = computed(() => TYPEMAP[props.hotType])

const hotList = ref([]);
const route = useRoute();
const getDetailHotList = async () => {
  const res = await getDetailHotAPI({
    id: route.params.id,
    type: props.hotType,
    limit: 3,
  });
  hotList.value = res?.result || [];
}
onMounted(() => getDetailHotList())

</script>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    margin-bottom: 10px;
    padding-left: 25px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    background: #fff;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
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
}
</style>

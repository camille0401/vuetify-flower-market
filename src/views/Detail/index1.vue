<template>
  <div class="fs-flower-goods-page">
    <div class="container" v-if="detailData">
      <v-breadcrumbs>
        <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
        <v-breadcrumbs-item :disabled="true">{{ detailData.cname }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <!-- 商品信息 -->
      <div class="info-container">
        <div class="goods-info">
          <div class="media">
            <!-- 图片预览区 -->
            <ImageView :image-list="detailData.mainPictures || []" />
          </div>
          <div class="spec">
            <v-card class="wx-auto" style="height: 100%;" color="background" elevation="0">
              <v-card-item>
                <v-card-title>{{ detailData.cname }}</v-card-title>
                <v-card-subtitle>{{ detailData.describes }}</v-card-subtitle>
              </v-card-item>
              <v-card-item>
                <v-divider></v-divider>
              </v-card-item>
              <v-card-item>
                <v-card-text>
                  <div class="g-service">
                    <p class="g-price">单价：<span>{{ detailData.price || '0' }}</span></p>
                    <p class="g-price">总计：<span>{{ allPrice }}</span></p>
                  </div>
                </v-card-text>
              </v-card-item>
              <v-card-item>
                <v-card-text>
                  <div class="goods-count-box">
                    <div class="d-flex align-center">
                      <label>数量：</label>
                      <FSBoundedNumInput v-model="count" :min="1" :max="detailData.inventory" :debounce="500"
                        @change="handleCountChange" @out-of-range="handleOutOfRange" />
                      <!-- <v-number-input v-model="count" width="200px" variant="outlined" control-variant="split" :min="0"
                        :max="detailData.inventory" hide-details inset></v-number-input> -->
                    </div>
                    <span>库存量：{{ detailData.inventory || '0' }}件</span>
                    <span>已售：{{ detailData.salesCount || '0' }}件</span>
                  </div>
                </v-card-text>
                <!-- 按钮组件 -->
              </v-card-item>
              <v-card-item>
                <v-card-text>
                  <v-btn class="mr-4" color="primary" elevation="8" size="x-large" prepend-icon="mdi-cart-plus"
                    @click="handleAddCart">加入购物车</v-btn>
                  <v-btn color="error" elevation="8" size="x-large" to="/createorder">立即购买</v-btn>
                </v-card-text>
              </v-card-item>
            </v-card>
          </div>
        </div>
        <div class="goods-footer">
          <!-- 商品详情 -->
          <div class="goods-tabs">
            <nav class="mb-2">
              <span>商品详情</span>
            </nav>
            <div class="goods-detail">
              <img v-for="img in detailData.detailPictures" :src="img" :key="img" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Detail">
import ImageView from './components/ImageView.vue';
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue';
import { useToast } from 'vue-toastification'
import { getDetailAPI } from '@/apis/detail';
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useCartCount } from "@/composables/useCartCount";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const { handleCountChange, handleOutOfRange } = useCartCount();

const count = ref(1); //input-count

const allPrice = computed(() => detailData.value.price * count.value || 0)

// 获取detail-page数据
const detailData = ref({});
const getDetailData = async (id = route.params.id) => {
  const res = await getDetailAPI(id);
  detailData.value = res || {};
}
onMounted(() => getDetailData());
onBeforeRouteUpdate((to) => {
  getDetailData(to.params.id)
})


const handleAddCart = () => {
  if (count.value === 0) {
    toast.warning('请先输入数量')
  } else {
    cartStore.addCart({
      ...detailData.value,
      count: count.value,
      selected: 1,
      picture: detailData.value?.mainPictures?.[0],
      goodsId: detailData.value?.id,
      // id: detailData.value.id,
      // name: detailData.value.goodsCnName,
      // price: detailData.value.price,
      // count: count.value,
      // skuId: skuObj.skuId,
      // attrsText: skuObj.specsText,
    })
  }
}



</script>

<style lang='scss' scoped>
.fs-flower-goods-page {
  .goods-info {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    width: 100%;
    min-height: 400px;
    background: #fff;

    .spec {
      flex: 1;
      min-height: 400px;
    }
  }

  .goods-count-box {
    display: flex;
    align-items: center;
    column-gap: 20px;
    font-size: 14px;
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 10px 20px;
  }

  .g-price {
    display: flex;
    align-items: center;
    line-height: 40px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
        line-height: 40px;
      }


    }
  }



  .goods-sales {
    display: flex;
    align-items: center;
    width: 400px;
    height: 140px;
    text-align: center;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $fs-primary-color;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $fs-primary-color;
            cursor: pointer;
          }
        }
      }
    }
  }

  .goods-tabs {
    width: 100%;
    min-height: 600px;
    background: #fff;

    nav {
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      height: 70px;
      line-height: 70px;

      a {
        padding: 0 40px;
        font-size: 18px;
        position: relative;

        >span {
          color: $priceColor;
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
  }

  .goods-detail {
    width: 100%;
    margin: 0 auto;

    .attrs {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;

      li {
        display: flex;
        margin-bottom: 10px;
        width: 50%;

        .dt {
          width: 100px;
          color: #999;
        }

        .dd {
          flex: 1;
          color: #666;
        }
      }
    }

    >img {
      width: 100%;
    }
  }

  .btn {
    margin-top: 20px;

  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>

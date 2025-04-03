<script setup>
import { getLikeListAPI } from '@/apis/user'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import FSGoodsItem from '@/components/FSGoodsItem.vue'
const userStore = useUserStore()


const likeList = ref([])

const getLikeList = async () => {
  const res = await getLikeListAPI({ limit: 4 })
  likeList.value = res.result
}

onMounted(() => getLikeList())


</script>

<template>
  <div class="fs-member-userhome-container">
    <div class="user-meta">
      <div class="avatar">
        <img :src="userStore.userInfo?.avatar" />
      </div>
      <h4>{{ userStore.userInfo?.account }}</h4>
    </div>

    <div class="user-order">
      <h3 class="h3Title">我的订单</h3>
      <div class="order-list">
        <RouterLink to="/member/order" active-class="active">
          <i class="iconfont icon-hy"></i>
          <span class="text">待付款</span>
        </RouterLink>
        <RouterLink to="/member/order" active-class="active">
          <i class="iconfont icon-aq"></i>
          <span class="text">进行中</span>
        </RouterLink>
        <RouterLink to="/member/order" active-class="active">
          <i class="iconfont icon-dw"></i>
          <span class="text">待评价</span>
        </RouterLink>
        <RouterLink to="/member/order" active-class="active">
          <i class="iconfont icon-dw"></i>
          <span class="text">全部订单</span>
        </RouterLink>
      </div>

    </div>

    <div class="user-like">
      <h3 class="h3Title">猜你喜欢</h3>
      <div class="goods-list">
        <FSGoodsItem v-for="good in likeList" :key="good.id" :goods="good" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fs-member-userhome-container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .h3Title {
    font-size: 16px;
    font-weight: normal;
    color: #232628;
  }

  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: 20px;
    height: 132px;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      font-size: 18px;
      font-weight: normal;
      color: #232628;
    }
  }

  .user-order {
    flex: 1;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;

    .order-list {
      display: flex;
      align-items: center;
      column-gap: 20px;
      width: 600px;
      margin: 20px auto 0;

      a {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 25%;
        color: #232628;
        font-size: 14px;
        line-height: 30px;

        i {
          font-size: 22px;
        }

        &:hover,
        &.active {
          color: $fs-base-color-dark;

        }
      }
    }
  }

  .user-like {
    flex: 1;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;

    .goods-list {
      display: grid;
      grid-template-columns: repeat(4, calc((100% - 30px) / 4));
      gap: 10px;
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>

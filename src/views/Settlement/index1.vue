<template>
  <div class="fs-settlement-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <div class="box-title with-action">
          <font style="vertical-align: inherit;">收货人信息</font>
          <div class="flex ">
            <!-- <el-button type="primary">新增地址</el-button>
            <el-button type="primary">切换地址</el-button> -->
            <v-btn color="primary" class="mr-4">
              新增地址
            </v-btn>
            <v-btn color="primary">
              切换地址
            </v-btn>
          </div>
        </div>
        <div class="box-body">
          <AddressForm />
        </div>
        <h3 class="box-title">订购人信息</h3>
        <div class="box-body">
          <OrderForm />
        </div>
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 留言 -->
        <h3 class="box-title">留言</h3>
        <div class="box-body">
          <NoteForm />
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="hanldeCreateOrder">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddressForm from './components/AddressForm.vue';
import OrderForm from './components/OrderForm.vue';
import NoteForm from './components/NoteForm.vue';
// import NoteForm from './components/NoteForom.vue';
import { onMounted, ref } from 'vue';


const checkInfo = ref({}); // 订单对象

</script>

<style lang="scss" scoped>
.fs-settlement-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding: 0 40px;
      line-height: 70px;
      border-bottom: 1px solid #f0f0f0;

      &.with-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    // box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    .box-body {
      // border: 1px solid red;
      padding: 20px 40px;
      border-bottom: 1px solid #f0f0f0;
    }

    .goods {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;

      .info {
        display: flex;
        text-align: left;

        img {
          width: 70px;
          height: 70px;
          margin-right: 20px;
        }

        .right {
          line-height: 24px;

          p {
            &:last-child {
              color: #999;
            }
          }
        }
      }

      s tr {
        th {
          background: #f5f5f5;
          font-weight: normal;
        }

        td,
        th {
          text-align: center;
          padding: 20px;
          border-bottom: 1px solid #f5f5f5;

          &:first-child {
            border-left: 1px solid #f5f5f5;
          }

          &:last-child {
            border-right: 1px solid #f5f5f5;
          }
        }
      }
    }

    .my-btn {
      width: 228px;
      height: 50px;
      border: 1px solid #e4e4e4;
      text-align: center;
      line-height: 48px;
      margin-right: 25px;
      color: #666666;
      display: inline-block;

      &.active,
      &:hover {
        border-color: $fs-base-color-dark;
      }
    }

    .total {
      dl {
        display: flex;
        justify-content: flex-end;
        line-height: 50px;

        dt {
          i {
            display: inline-block;
            width: 2em;
          }
        }

        dd {
          width: 240px;
          text-align: right;
          padding-right: 70px;

          &.price {
            font-size: 20px;
            color: $priceColor;
          }
        }
      }
    }

    .submit {
      text-align: right;
      padding: 60px;
      border-top: 1px solid #f5f5f5;
    }
  }
}
</style>

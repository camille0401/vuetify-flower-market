<template>
  <header class='fs-app-header'>
    <div class="container header-box">
      <FSLogo />

      <div class="search">
        <v-text-field label="キーワードで検索する" type="text" variant="outlined" color="primary" prepend-inner-icon="mdi-magnify"
          clearable hide-details>
        </v-text-field>
        <v-btn color="primary" size="x-large">検索</v-btn>
      </div>
      <CartIcon />
    </div>
  </header>
</template>

<script setup name="LayoutHeader">
import FSLogo from "@/components/FSLogo.vue";
import CartIcon from "@/views/CartList/components/CartIcon.vue";

import { ref } from 'vue'

const loaded = ref(false)
const loading = ref(false)

const onClick = () => {

  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
</script>

<style scoped lang='scss'>
.fs-app-header {
  .header-box {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  .search {
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: calc(100% - 340px);
    padding: 5px 20px;
    // border: 1px solid $fs-primary-color;
    // border-radius: var(--el-border-radius-base);
    // background: rgba(255, 51, 153, 0.05);
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 2.2rem;
      }

      em {
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        background: $helpColor;
        line-height: 1;
        font-style: normal;
        color: #fff;
        font-size: 1.2rem;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>

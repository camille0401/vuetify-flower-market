<template>
  <div class="fs-login-page">
    <section class="login-section">
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script setup>


</script>

<style scoped lang='scss'>
.fs-login-page {
  background: #ffffff;
  background-position: center;
  background-size: cover;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20vh;

  p {
    font-size: 14px;
    color: #FFF;
  }
}


.login-section {
  width: 100%;
  background: url("@/assets/images/login-bg.jpg");
  background-position: center;
  background-size: cover;
  padding: 150px 0;

  .container {
    display: flex;
    justify-content: flex-end;
  }

}

.login-footer {
  padding: 0 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>

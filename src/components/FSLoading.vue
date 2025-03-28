<template>
  <div class="fs-loading">
    <div class="outer-box">
      <div class="large-box">
        <div class="small-box"></div>
      </div>
    </div>
  </div>
</template>

<script setup name="FSLoading">

</script>

<style lang="scss" scoped>
.fs-loading {
  .outer-box {
    width: 3em;
    height: 3em;
    animation: cube-box-ani 1s infinite ease-in-out;
    outline: 1px solid transparent;
  }

  .large-box {
    height: 3em;
    width: 3em;
    background-color: $fs-base-color-dark;
    outline: 1px solid transparent;
  }

  .small-box {
    height: 3em;
    width: 3em;
    background-color: white;
    z-index: 1;
    outline: 1px solid transparent;
    animation: small-box-ani 1s alternate infinite ease-in-out;
  }

  @keyframes small-box-ani {
    0% {
      transform: scale(0.2);
    }

    100% {
      transform: scale(0.75);
    }
  }

  @keyframes cube-box-ani {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(90deg);
    }
  }

}
</style>

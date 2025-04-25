<template>
  <div class="fs-goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <!-- <img :src="imageList[activeIndex]" alt="" width="100%" height="100%" /> -->
      <v-img :aspect-ratio="1" class="bg-white" :src="imageList[activeIndex]" width="100%" cover></v-img>
      <!-- 蒙层小滑块 -->
      <!-- <div v-show="!isOutside" class="layer" :style="{ left: `${left}px`, top: `${top}px` }"></div> -->
    </div>
    <!-- 小图列表 -->
    <!-- <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="handleMouseEnter(i)"
        :class="{ 'active': activeIndex === i }">
        <img :src="img" alt="" width="100%" height="100%" />
      </li>
    </ul> -->
    <div class="small-img-box mt-4">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="(img, n) in imageList" :key="n" v-slot="{ isSelected, toggle }">
          <v-sheet class="mr-2" @click="toggle">
            <img :class="isSelected ? 'active' : ''" width="68px" height="68px" :src="img"
              @mouseenter="handleMouseEnter(n)" />
          </v-sheet>
        </v-slide-group-item>
      </v-slide-group>
    </div>
    <!-- 放大镜大图 -->
    <!-- <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!mobile && !isOutside"></div> -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

defineProps({
  imageList: {
    type: Array,
    default: [],
  }
})
// 图片列表
// const imageList = [
//   "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
//   "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
//   "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
//   "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
//   "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
// ]

// 1.小图切换大图显示
const activeIndex = ref(0);
const handleMouseEnter = (i) => {
  activeIndex.value = i;
}
// 2. 获取鼠标相对位置
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);

// 3. 控制滑块跟随鼠标移动（监听elementX/Y变化，一旦变化 重新设置left/top）
const left = ref(0);
const top = ref(0);
const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY, isOutside], () => {
  // 如果鼠标没有移入到盒子里面 直接不执行后面的逻辑
  if (isOutside.value) return;
  // 有效范围内控制滑块距离
  // 横向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100;
  }
  // 纵向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100;
  }
  // 处理边界
  if (elementX.value > 300) { left.value = 200 };
  if (elementX.value < 100) { left.value = 0 };
  if (elementY.value > 300) { top.value = 200 };
  if (elementY.value < 100) { top.value = 0 };
  // 控制大图的显示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2

})

</script>

<style scoped lang="scss">
.fs-goods-image {
  width: 100%;
  // min-height: 400px;
  position: relative;

  .middle {
    width: 100%;
    // height: 400px;
    background: #f5f5f5;

    // img {
    //   width: 100%;
    //   height: 100%;
    // }
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 100%;
    // height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small-img-box {
    width: 100%;
    min-height: 68px;

    img {
      border: 2px solid #E0E0E0;

      &:hover,
      &.active {
        border-color: rgb(var(--v-theme-primary));
      }
    }


  }

}
</style>

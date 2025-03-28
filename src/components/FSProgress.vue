<template>
  <div class="meprogress">
    <div class="meprogress-bar" :style="{ 'width': `${percentage}%` }">
      <span class="meprogress-bar-value">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import Big from 'big.js'

const range = {
  0: 6,
  10: 5,
  20: 4,
  30: 3,
  40: 2,
  50: 1,
  60: 0.5,
  70: 0.1,
  80: 0.05,
  90: 0.01,
};
const percentage = ref(100);
const initStep = 5;
const frequency = 1000;
let step = initStep;
let timer = null;

const percentHandle = () => {
  timer = setInterval(() => {
    if (percentage.value >= 100) {
      percentage.value = 100;
      step = initStep;
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    } else {
      if (percentage.value >= 95) {
        step = 0.001;
      }
      if (percentage.value >= 98) {
        step = 0.0001;
      }
      percentage.value = Big(percentage.value).plus(Big(step));
      step = range[(parseInt((percentage.value / 10).toString()) * 10).toString()];
    }
  }, frequency)
}

onMounted(() => percentHandle())

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})

</script>

<style lang="scss" scoped>
.meprogress {
  width: 100%;
  height: 20px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
}

.meprogress-bar {
  width: 0;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: cornflowerblue;
  background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
  transition: width .6s ease;
  border-radius: 4px;
  animation: meprogress-bar-anim 2s linear infinite;
}

.meprogress-bar-value {
  font-size: 13px;
  font-weight: bold;
  color: white;
  margin-right: 5px;
}

@keyframes meprogress-bar-anim {
  from {
    background-position: 40px 0;
  }

  to {
    background-position: 0 0;
  }
}
</style>

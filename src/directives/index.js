import { useIntersectionObserver } from '@vueuse/core'

// lazy-img
export const lazyImgPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指令绑定的那个dom元素,这里也就是img
        // binding: binding.value 指令等于后面绑定的表达式的值, 图片的url
        const { stop } = useIntersectionObserver(el, ([entry]) => {
          if (entry.isIntersecting) {
            // 进入视口区域
            el.src = binding?.value || ''
            stop()
          }
        })
      },
    })
  },
}

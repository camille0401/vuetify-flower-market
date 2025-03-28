import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { getCartListAPI, insertCartAPI, deleteCartAPI, mergeCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const cartList = ref([])
    const isLogin = computed(() => userStore.token)

    // 计算属性
    // 1. 总的数量 所有项的count之和
    const cartAllCount = computed(() => cartList.value.reduce((prev, cur) => prev + cur.count, 0))
    // 2. 总价 所有项的count*price之和
    const cartAllPrice = computed(() =>
      cartList.value.reduce((prev, cur) => prev + cur.price * cur.count, 0).toFixed(2),
    )
    // 3.是否全选
    const cartIsAll = computed(() => (cartList.value.every((item) => item.selected) ? true : false))

    // 4. 已选择数量
    const cartSelectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0),
    )
    // 5. 已选择商品价钱合计
    const cartSelectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
        .toFixed(2),
    )

    // 查询购物车列表
    const getCartList = async () => {
      const res = await getCartListAPI()
      cartList.value = res.result
    }

    // 合并购物车
    const mergeCartList = async () => {
      if (cartList.value.length === 0) return
      const mapdata = cartList.value.map((item) => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count,
        }
      })
      await mergeCartAPI(mapdata)
      getCartList()
    }

    // add-cart
    // goods: goods-obj
    const addCart = async (goods) => {
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      if (isLogin.value) {
        const res = await insertCartAPI({
          skuId: goods.skuId,
          count: goods.count,
        })
        if (res.code === '1') {
          getCartList()
        }
      } else {
        const findObj = cartList.value.find((item) => item.skuId === goods.skuId)
        if (findObj) {
          findObj.count++
        } else {
          cartList.value.push(goods)
        }
      }
    }

    // delete-cart
    const delCart = async (skuId) => {
      if (isLogin.value) {
        const res = await deleteCartAPI([skuId])
        if (res.code === '1') {
          getCartList()
        }
      } else {
        const ind = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(ind, 1)
      }
    }

    // cart-list-page single-checkbox
    const singleCheck = (skuId, selected) => {
      const findObj = cartList.value.find((item) => item.skuId === skuId)
      findObj.selected = selected
    }

    // cart-list-page all-checkbox
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    return {
      cartList,
      cartAllCount,
      cartAllPrice,
      cartIsAll,
      cartSelectedCount,
      cartSelectedPrice,
      getCartList,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      mergeCartList,
    }
  },
  {
    persist: true,
  },
)

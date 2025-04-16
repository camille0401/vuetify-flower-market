import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import Big from 'big.js'
import {
  getCartListAPI,
  insertCartAPI,
  deleteCartAPI,
  mergeCartAPI,
  updateCartAPI,
  selectedCartAPI
} from '@/apis/cart'

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
    const cartAllPrice = computed(() => {
      return cartList.value.reduce((prev, cur) => {
        const price = new Big(cur.price)
        const count = new Big(cur.count)
        return prev.plus(price.times(count))
      }, new Big(0))
    })

    // 3.是否全选
    const cartIsAll = computed(() => {
      if (cartList.value.length === 0) return false
      return cartList.value.every((item) => item.selected)
    })

    // 4. 已选择数量
    const cartSelectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0)
    )

    // 5. 已选择商品价钱合计
    const cartSelectedPrice = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((prev, cur) => {
          const itemTotal = new Big(cur.price).times(cur.count)
          return prev.plus(itemTotal)
        }, new Big(0))
    })

    // 查询购物车列表
    const getCartList = async () => {
      const res = await getCartListAPI()
      cartList.value = res.map((item) => {
        return {
          ...item,
          picture: item.mainPictures?.[0] || ''
        }
      })
    }

    // 合并购物车
    const mergeCartList = async () => {
      if (cartList.value.length === 0) return
      const mapdata = cartList.value.map((item) => {
        return {
          goodsId: item.goodsId,
          selected: item.selected,
          goodsCount: item.count
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
      // 思路：通过匹配传递过来的商品对象中的id能不能在cartList中找到，找到了就是添加过
      if (isLogin.value) {
        await insertCartAPI({
          goodsId: goods.goodsId,
          goodsCount: goods.count,
          selected: goods.selected
        })
        getCartList()
      } else {
        const findObj = cartList.value.find((item) => item.goodsId === goods.goodsId)
        if (findObj) {
          findObj.count++
        } else {
          cartList.value.push(goods)
        }
      }
    }

    // update-cart
    const updateCart = async (goods) => {
      await updateCartAPI({
        goodsId: goods.goodsId,
        goodsCount: goods.count,
        selected: goods.selected
      })
      getCartList()
    }

    // selected-cart
    const selectedCart = async () => {
      if (cartList.value.length === 0) return
      const mapdata = cartList.value.map((item) => {
        return {
          goodsId: item.goodsId,
          selected: item.selected,
          goodsCount: item.count
        }
      })
      await selectedCartAPI(mapdata)
      getCartList()
    }

    // delete-cart
    const delCart = async (goodsId) => {
      if (isLogin.value) {
        await deleteCartAPI([goodsId])
        getCartList()
      } else {
        const ind = cartList.value.findIndex((item) => item.goodsId === goodsId)
        cartList.value.splice(ind, 1)
      }
    }

    // delete-all-cart
    const delAllCart = async (goodsIds) => {
      if (isLogin.value) {
        await deleteCartAPI(goodsIds)
        getCartList()
      } else {
        cartList.value = cartList.value.filter((item) => !goodsIds.includes(item.goodsId))
      }
    }

    // cart-list-page single-checkbox
    const singleCheck = async (goodsId, selected) => {
      const findObj = cartList.value.find((item) => item.goodsId === goodsId)
      findObj.selected = selected ? 1 : 0
      // if (isLogin.value) {
      //   selectedCart()
      // }
    }

    // cart-list-page all-checkbox
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected ? 1 : 0))
      // if (isLogin.value) {
      //   selectedCart()
      // }
    }

    // input-count-change
    const countChange = (goods) => {
      // if (isLogin.value) {
      //   updateCart(goods)
      // }
    }

    const clearCartList = () => {
      cartList.value = []
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
      delAllCart,
      singleCheck,
      allCheck,
      mergeCartList,
      countChange,
      clearCartList
    }
  },
  {
    persist: true
  }
)

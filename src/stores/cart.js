import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Big from 'big.js';
import {
  getCartListAPI,
  insertCartAPI,
  deleteCartAPI,
  mergeCartAPI,
  updateCartAPI,
  selectedCartAPI,
} from '@/apis/cart';
import { useUserStore } from './user';

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore();
    const cartList = ref([]);
    const isLogin = computed(() => !!userStore.token);

    // ---------- 计算属性 ----------
    const cartAllCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0));

    const cartAllPrice = computed(() =>
      cartList.value.reduce(
        (sum, item) => sum.plus(new Big(item.price).times(item.count)),
        new Big(0),
      ),
    );

    const cartIsAll = computed(
      () => cartList.value.length > 0 && cartList.value.every((item) => item.selected),
    );

    const cartSelectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count, 0),
    );

    const cartSelectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum.plus(new Big(item.price).times(item.count)), new Big(0)),
    );

    // ---------- 工具函数 ----------
    const normalizeCartItem = (item) => ({
      ...item,
      picture: item.mainPictures?.[0] || '',
    });

    const syncCartList = async () => {
      const res = await getCartListAPI();
      cartList.value = res.map(normalizeCartItem);
    };

    // ---------- 操作方法 ----------
    const getCartList = async () => {
      if (isLogin.value) await syncCartList();
    };

    const mergeCartList = async () => {
      if (!cartList.value.length) return;
      const data = cartList.value.map(({ goodsId, selected, count }) => ({
        goodsId,
        selected,
        goodsCount: count,
      }));
      await mergeCartAPI(data);
      await syncCartList();
    };

    const addCart = async (goods) => {
      if (isLogin.value) {
        await insertCartAPI({
          goodsId: goods.goodsId,
          goodsCount: goods.count,
          selected: goods.selected,
        });
        await syncCartList();
      } else {
        console.log(goods);
        const existing = cartList.value.find((item) => item.goodsId === goods.goodsId);
        console.log(existing);
        existing ? existing.count++ : cartList.value.push(goods);
      }
    };

    const updateCart = async (goods) => {
      if (isLogin.value) {
        await updateCartAPI({
          goodsId: goods.goodsId,
          goodsCount: goods.count,
          selected: goods.selected,
        });
        await syncCartList();
      }
    };

    const selectedCart = async () => {
      if (!cartList.value.length) return;
      const data = cartList.value.map(({ goodsId, selected, count }) => ({
        goodsId,
        selected,
        goodsCount: count,
      }));
      await selectedCartAPI(data);
      await syncCartList();
    };

    const delCart = async (goodsId) => {
      if (isLogin.value) {
        await deleteCartAPI([goodsId]);
        await syncCartList();
      } else {
        cartList.value = cartList.value.filter((item) => item.goodsId !== goodsId);
      }
    };

    const delAllCart = async (goodsIds) => {
      if (isLogin.value) {
        await deleteCartAPI(goodsIds);
        await syncCartList();
      } else {
        cartList.value = cartList.value.filter((item) => !goodsIds.includes(item.goodsId));
      }
    };

    const singleCheck = (goodsId, selected) => {
      const item = cartList.value.find((i) => i.goodsId === goodsId);
      if (item) item.selected = selected ? 1 : 0;
    };

    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected ? 1 : 0));
    };

    const countChange = (goods) => {
      if (isLogin.value) updateCart(goods);
    };

    const clearCartList = () => {
      cartList.value = [];
    };

    return {
      cartList,
      cartAllCount,
      cartAllPrice,
      cartIsAll,
      cartSelectedCount,
      cartSelectedPrice,
      getCartList,
      mergeCartList,
      addCart,
      updateCart,
      selectedCart,
      delCart,
      delAllCart,
      singleCheck,
      allCheck,
      countChange,
      clearCartList,
    };
  },
  {
    persist: true,
  },
);

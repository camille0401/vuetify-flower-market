import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginAPI, registerAPI, updateUserInfoAPI, logoutAPI } from '@/apis/user';
import { useCartStore } from './cart';
import { useOrderStore } from './order';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('');
    const userInfo = ref({});

    const cartStore = useCartStore();
    const orderStore = useOrderStore();

    /** 清除用户信息及依赖数据 */
    const clearUserInfo = () => {
      token.value = '';
      userInfo.value = {};
      cartStore.clearCartList();
      orderStore.clearOrderData();
    };

    /** 获取登录后的用户信息 */
    const getUserInfo = (data) => {
      if (!data?.token || !data?.user) return;

      token.value = data.token;
      userInfo.value = data.user;
      // 如果需要进一步获取详细信息，可在此处调用 userInfoAPI()
    };

    /** 登录操作 */
    const login = async (form) => {
      try {
        const res = await loginAPI(form);
        console.log(res);
        if (res) {
          getUserInfo(res);
          await cartStore.mergeCartList(); // 合并购物车
        }
      } catch (err) {
        console.error('登录失败', err);
        throw err;
      }
    };

    /** 注册操作 */
    const register = async (form) => {
      try {
        const res = await registerAPI(form);
        return res;
      } catch (err) {
        console.error('注册失败', err);
        throw err;
      }
    };

    /** 更新用户信息 */
    const updateUserInfo = async (form) => {
      try {
        const res = await updateUserInfoAPI(form);
        if (res) {
          userInfo.value = { ...userInfo.value, ...form };
        }
      } catch (err) {
        console.error('更新用户信息失败', err);
        throw err;
      }
    };

    /** 修改密码（可与更新信息合并） */
    const changePassword = async (form) => {
      try {
        const res = await updateUserInfoAPI(form);
        console.log('密码修改成功', res);
      } catch (err) {
        console.error('密码修改失败', err);
        throw err;
      }
    };

    /** 登出操作 */
    const logout = async () => {
      try {
        await logoutAPI();
      } catch (err) {
        console.warn('注销失败但强制退出', err);
      } finally {
        clearUserInfo();
      }
    };

    return {
      token,
      userInfo,
      login,
      register,
      getUserInfo,
      clearUserInfo,
      updateUserInfo,
      changePassword,
      logout,
    };
  },
  {
    persist: true, // 持久化用户状态
  },
);

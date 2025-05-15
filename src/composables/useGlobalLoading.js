import { ref } from 'vue';

export const useGlobalLoading = () => {
  const globalLoading = ref(false);

  function showLoading() {
    globalLoading.value = true;
  }

  function hideLoading() {
    globalLoading.value = false;
  }

  return { globalLoading, showLoading, hideLoading };
};

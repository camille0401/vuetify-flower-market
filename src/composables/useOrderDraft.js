// composables/useOrderDraft.js
import { useOrderStore } from '@/stores/order';

export function useOrderDraft() {
  const orderStore = useOrderStore();

  const saveDraft = ({ goodsList = [], summary = {} }) => {
    orderStore.setGoodsList(goodsList);
    orderStore.setSummary(summary);
  };

  const loadDraft = () => {
    return {
      goodsList: orderStore.goodsList,
      summary: orderStore.summary,
    };
  };

  const clearDraft = () => {
    orderStore.clearOrderData();
  };

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    goodsList: orderStore.goodsList,
    summary: orderStore.summary,
  };
}

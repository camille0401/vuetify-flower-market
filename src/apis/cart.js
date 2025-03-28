import request from '@/utils/request'

/**
 * @description: cart-list-api
 * @return {*}
 */
export const getCartListAPI = () => {
  return request({
    url: '/member/cart',
    method: 'GET',
  })
}

/**
 * @description: insert-cart-api
 * @data {*}
 * @return {*}
 */
export const insertCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}

/**
 * @description: delete-cart-api
 * @ids {*}
 * @return {*}
 */
export const deleteCartAPI = (ids) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      ids,
    },
  })
}

/**
 * @description: merge-cart-api
 * @data {*}
 * @return {*}
 */
export const mergeCartAPI = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data,
  })
}

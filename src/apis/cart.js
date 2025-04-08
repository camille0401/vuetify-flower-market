import request from '@/utils/request'

/**
 * @description: cart-list-api
 * @return {*}
 */
export const getCartListAPI = () => {
  return request({
    url: '/flower/carts',
    method: 'GET'
  })
}

/**
 * @description: insert-cart-api
 * @data {*}
 * @return {*}
 */
export const insertCartAPI = ({ goodsCount, goodsId, selected }) => {
  return request({
    url: '/flower/carts',
    method: 'POST',
    data: {
      goodsCount,
      goodsId,
      selected
    }
  })
}

/**
 * @description: update-cart-api
 * @data {*}
 * @return {*}
 */
export const updateCartAPI = ({ goodsCount, goodsId, selected }) => {
  return request({
    url: '/flower/carts',
    method: 'PUT',
    data: {
      goodsCount,
      goodsId,
      selected
    }
  })
}

/**
 * @description: update-cart-api
 * @data {*}
 * @return {*}
 */
export const selectedCartAPI = (data) => {
  return request({
    url: '/flower/carts/selected',
    method: 'PUT',
    data
  })
}

/**
 * @description: delete-cart-api
 * @ids {*}
 * @return {*}
 */
export const deleteCartAPI = (ids) => {
  const idstring = ids.join(',')
  return request({
    url: `/flower/carts`,
    method: 'DELETE',
    params: {ids: idstring}
  })
}

/**
 * @description: merge-cart-api
 * @data {*}
 * @return {*}
 */
export const mergeCartAPI = (data) => {
  return request({
    url: '/flower/carts/merge',
    method: 'POST',
    data
  })
}

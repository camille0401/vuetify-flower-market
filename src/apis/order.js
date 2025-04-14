import request from '@/utils/request'

/**
 * @description: checkinfo-detail-api
 * @return {*}
 */
export const fetchOrderAPI = (params) => {
  return request({
    url: '/flower/orders',
    method: 'GET',
    params
  })
}

/**
 * @description: create-order
 * @return {*}
 */
export const createOrderAPI = (data) => {
  return request({
    url: '/flower/orders',
    method: 'POST',
    data
  })
}

/**
 * @description: create-order
 * @return {*}
 */
export const getOrderAPI = (id) => {
  console.log(id)
  return request({
    url: `/member/order/${id}`
  })
}

export const getUserOrderAPI = (params) => {
  return request({
    url: '/member/order',
    method: 'GET',
    params
  })
}

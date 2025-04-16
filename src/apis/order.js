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
export const getOrderDetailAPI = (id) => {
  return request({
    url: `/flower/orders/${id}`,
    method: 'GET'
  })
}

export const cancelOrderAPI = (id) => {
  return request({
    url: `/flower/orders/${id}`,
    method: 'PUT'
  })
}

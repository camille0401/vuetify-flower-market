import request from '@/utils/request'

/**
 * @description: detail-page-data
 * @id {*}
 * @return {*}
 */
export function getDetailAPI(id) {
  return request({
    url: `/goods`,
    method: 'GET',
    params: {
      id,
    },
  })
}

/**
 * @description: detail-page-hot-data
 * @id {*}
 * @return {*}
 */
export function getDetailHotAPI(params) {
  return request({
    url: `/goods/hot`,
    method: 'GET',
    params,
  })
}

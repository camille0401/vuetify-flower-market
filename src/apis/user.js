import request from '@/utils/request'

/**
 * @description: category-page-data
 * @data {*}
 * @return {*}
 */
export function loginAPI(data) {
  return request({
    url: `/login`,
    method: 'POST',
    data,
  })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit,
    },
  })
}

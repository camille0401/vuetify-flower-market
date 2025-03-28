import request from '@/utils/request'

/**
 * @description: category-page-data
 * @id {*}
 * @return {*}
 */
export function getCategoryAPI(id) {
  return request({
    url: `/category`,
    method: 'GET',
    params: {
      id,
    },
  })
}

/**
 * @description: sub-category-data
 * @id {*}
 * @return {*}
 */
export function getCategoryFilterAPI(id) {
  return request({
    url: `/category/sub/filter`,
    method: 'GET',
    params: {
      id,
    },
  })
}

/**
 * @description: sub-category-list-data
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export function getSubCategoryAPI(data) {
  return request({
    url: `/category/goods/temporary`,
    method: 'POST',
    data,
  })
}

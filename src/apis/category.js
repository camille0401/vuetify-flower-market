import request from '@/utils/request'

/**
 * @description: category-page-api
 * @id {*}
 * @return {*}
 */
export function getCategoryAPI(typeId) {
  return request({
    url: `/flower/home/category`,
    method: 'GET',
    params: {typeId}
  })
}

/**
 * @description: category-page-api
 * @id {*}
 * @return {*}
 */
export function getCategoryGoodsAPI(params) {
  return request({
    url: `/flower/home/category/goods`,
    method: 'GET',
    params
  })
}

// /**
//  * @description: category-page-data
//  * @id {*}
//  * @return {*}
//  */
// export function getCategoryAPI(id) {
//   return request({
//     url: `/category`,
//     method: 'GET',
//     params: {
//       id,
//     },
//   })
// }

// /**
//  * @description: sub-category-data
//  * @id {*}
//  * @return {*}
//  */
// export function getCategoryFilterAPI(id) {
//   return request({
//     url: `/category/sub/filter`,
//     method: 'GET',
//     params: {
//       id,
//     },
//   })
// }

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
export function getSubCategoryAPI(params) {
  return request({
    url: `/flower/home/subCategorys`,
    method: 'GET',
    params,
  })
}

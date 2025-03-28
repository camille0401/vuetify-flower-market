import request from '@/utils/request'

/**
 * @description: home-banner
 * @cc {*}
 * @return {*}
 */
export function getBannerAPI(param = {}) {
  // 默认为1 商品为2
  const { distributionSite = '1' } = param
  return request({
    url: `/home/banner`,
    method: 'GET',
    params: { distributionSite },
  })
}

/**
 * @description: new-module
 * @param {*}
 * @return {*}
 */
export function getNewAPI() {
  return request({
    url: '/home/new',
  })
}

/**
 * @description: hot-module
 * @param {*}
 * @return {*}
 */
export function getHotAPI() {
  return request({
    url: '/home/hot',
  })
}

/**
 * @description: all-goods-module
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return request({
    url: '/home/goods',
  })
}

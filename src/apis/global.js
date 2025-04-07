import request from '@/utils/request'

/**
 * @description: home-category
 * @cc {*}
 * @return {*}
 */
export function getHomeGoodsTypeAPI() {
  return request({
    url: '/flower/home/goodsType',
  })
}

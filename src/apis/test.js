import request from '@/utils/request'

export function getHomeGoodsTypeAPI() {
  return request({
    url: '/flower/home/goodsType',
  })
}

export function getHomeGoodsAPI() {
  return request({
    url: '/flower/home/goods',
  })
}

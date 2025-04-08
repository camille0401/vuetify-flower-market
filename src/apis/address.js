import request from '@/utils/request'

export function getAddressAPI() {
  return request({
    url: `/flower/address`,
    method: 'GET'
  })
}

export function insertAddressAPI(data) {
  return request({
    url: `/flower/address`,
    method: 'POST',
    data
  })
}

export function updateAddressAPI(data) {
  return request({
    url: `/flower/address`,
    method: 'PUT',
    data
  })
}

export function deleteAddressAPI(id) {
  return request({
    url: `/flower/address/${id}`,
    method: 'DELETE'
  })
}

export function updateDefaultAddressAPI(data) {
  return request({
    url: `/flower/address/default`,
    method: 'PUT',
    data
  })
}

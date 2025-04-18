import request from '@/utils/request';

export function loginAPI(data) {
  return request({
    url: `/auth/login`,
    method: 'POST',
    data,
  });
}

export function registerAPI(data) {
  return request({
    url: `/auth/create`,
    method: 'POST',
    data,
  });
}

export const userInfoAPI = () => {
  return request({
    url: '/auth/info',
    method: 'GET',
  });
};

export const logoutAPI = () => {
  return request({
    url: '/auth/logout',
    method: 'DELETE',
  });
};

export const updateUserInfoAPI = (data) => {
  return request({
    url: '/auth',
    method: 'PUT',
    data,
  });
};

export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit,
    },
  });
};

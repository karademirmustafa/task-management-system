import ApiService from './ApiService';

export async function apiUserProfile() {
  return ApiService.fetchData({
    url: '/users/profile',
    method: 'get'
  });
}

export async function apiGetAllUsers() {
  return ApiService.fetchData({
    url: '/users',
    method: 'get'
  });
}

import ApiService from './ApiService';

export async function apiUserProfile() {
  return ApiService.fetchData({
    url: '/users/profile',
    method: 'get'
  });
}

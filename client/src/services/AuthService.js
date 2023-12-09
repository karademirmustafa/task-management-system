import ApiService from './ApiService';

export async function apiSignIn(data) {
  return ApiService.fetchData({
    url: '/auth/login',
    method: 'post',
    data
  });
}

export async function apiSignUp(data) {
  return ApiService.fetchData({
    url: '/auth/register',
    method: 'post',
    data
  });
}





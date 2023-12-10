import ApiService from './ApiService';

export async function apiGetTasks(query) {
  return ApiService.fetchData({
    url: `/tasks${query}`,
    method: 'get'
  });
}
export async function apiGetTask(id) {
  console.log(id,"id")
  return ApiService.fetchData({
    url: `/tasks/${id}`,
    method: 'get'
  });
}
export async function apiAddTask(data) {
  return ApiService.fetchData({
    url: `/tasks`,
    method: 'post',
    data
  });
}
export async function apiEditTask(data,id) {
  return ApiService.fetchData({
    url: `/tasks/${id}`,
    method: 'put',
    data
  });
}
export async function apiRemoveTask(id) {
  return ApiService.fetchData({
    url: `/tasks/${id}`,
    method: 'delete',
  });
}



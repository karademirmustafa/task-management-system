function createQueryString(params) {
    const queryString = new URLSearchParams();
  
    queryString.append('orderBy', params.orderBy || -1);
    queryString.append('page', params.page || 1);
    queryString.append('size', params.size || 10);
  
    if (params.sort && typeof params.sort === 'object') {
      Object.keys(params.sort).forEach((key) => {
        queryString.append(`sort[${key}]`, params.sort[key]);
      });
    } else {
      queryString.append('sort', { createdAt: 'asc' });
    }
    if (params.filter) {
      Object.keys(params.filter).forEach((key) => {
        if (typeof params.filter[key] === 'object') {
          Object.keys(params.filter[key]).forEach((subKey) => {
            queryString.append(`${key}[${subKey}]`, params.filter[key][subKey]);
          });
        } else {
          queryString.append(key, params.filter[key]);
        }
      });
    }
  
    return queryString.toString();
  }

  
  export default createQueryString;
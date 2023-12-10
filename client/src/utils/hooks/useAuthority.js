import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ADMIN, MANAGER, USER } from 'constants/roles.constant';

function useAuthority(userAuthority = [], authority = [], emptyCheck = false) {
  const roleMatched = useMemo(() => {
    if (userAuthority.length === 0 || authority.length === 0 || typeof authority === 'undefined') {
      return !emptyCheck;
    }
    const allowedRoles=[ADMIN,MANAGER,USER]
    
    const maxUserAuthority = Math.max(...userAuthority);
    const maxRequiredAuthority = Math.max(...authority); 

    if (!allowedRoles.includes(maxUserAuthority)) {
      return false;
    }
    if (maxUserAuthority >= maxRequiredAuthority) {
      return true; 
    }

    return false; 
  }, [authority, userAuthority, emptyCheck]);

  if (isEmpty(authority) || isEmpty(userAuthority) || typeof authority === 'undefined') {
    return !emptyCheck;
  }

  return roleMatched;
}

export default useAuthority;

module.exports = {
    hasRole(roles, targetRole) {
      if (!roles) return false;
  
      if (Array.isArray(roles)) {
        return roles.includes(targetRole);
      } else if (typeof roles === "object") {
        return Object.values(roles).includes(targetRole);
      }
  
      return false;
    },
  };
  
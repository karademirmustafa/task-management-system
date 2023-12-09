const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req?.roles) return res.status(401).json({status:false,message:"Unauthorized",data:null});
      const rolesArray = [...allowedRoles];
      const result = req.roles
        .map((role) => rolesArray.includes(role))
        .find((val) => val === true);
        
      if (!result) return res.status(401).json({status:false,message:"Unauthorized",data:null});
      next();
    };
  };
  
  
  module.exports=verifyRoles;
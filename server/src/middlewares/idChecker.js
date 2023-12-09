const {ErrorResponse} = require("../utils/error");
const idChecker = (field) => (req,res,next) => {
    const idField = field || 'id';
    if(!req.params[idField]?.match(/^[0-9a-fA-F]{24}$/)){
        next(new ErrorResponse("You entered an invalid id!",400));
        return;
    }
    next();
}

module.exports=idChecker
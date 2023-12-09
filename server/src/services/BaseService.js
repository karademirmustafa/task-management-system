let BaseModel = null;
class BaseService {
  constructor(model) {
    this.BaseModel = model;
  }
  create(data) {
    return new this.BaseModel(data).save();
  }
  list(where,select='',populate='') {
    return this.BaseModel.find(where || {}).select(select).populate(populate);
  }
  findById(id,select='',populate=''){
    return this.BaseModel.findById(id).select(select).populate(populate);
  }
  findOne(where,select='',populate='',populate2='') {
    return this.BaseModel.findOne(where).select(select).populate(populate).populate(populate2);
  }
  update(id, data,select='') {
    return this.BaseModel.findByIdAndUpdate(id, data, { new: true }).select(select);
  }
  updateWhere(where,data,select=''){
    return this.BaseModel.findOneAndUpdate(where,data,{new:true}).select(select);
  }
  delete(id) {
    return this.BaseModel.findByIdAndDelete(id);
  }


}
module.exports = BaseService;
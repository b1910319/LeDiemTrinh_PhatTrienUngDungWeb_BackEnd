const ApiError = require("../api-error");
const TraSuaService = require("../services/traSua.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if(!req.body?.tenTS){
    return next(new ApiError(400, "Tên trà sữa không được trống"));
  }
  try {
    const traSuaService = new TraSuaService(MongoDB.client);
    const document = await traSuaService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tạo danh mục")
    );
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const traSuaService = new TraSuaService(MongoDB.client);
    const {tenTS} = req.query;
    if(tenTS){
      documents = await traSuaService.findByName(tenTS);
    }else{
      documents = await traSuaService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm danh mục")
    );
  }
  return res.send(documents);
};
exports.findOne = async (req, res, next) => {
  try {
    const traSuaService = new TraSuaService(MongoDB.client);
    const document = await traSuaService.findById(req.params.id);
    if(!document){
      return next(new ApiError(404, "Danh mục không được tìm thấy"));
    }
    return res.send(document);
  } catch (error) {
    
  }
};
exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length === 0){
    return next(new ApiError(400, "Dữ liệu update không được trống"));
  }
  try {
    const traSuaService = new TraSuaService(MongoDB.client);
    const document = await traSuaService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(404, "Danh mục không được tìm thấy"));
    }
    return res.send({message: "Danh mục đã được update"});
  } catch (error) {
    return next(new ApiError(500, `Đã xảy ra lỗi khi update danh mục có id=${req.params.id}`));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const traSuaService = new TraSuaService(MongoDB.client);
    const document = await traSuaService.delete(req.params.id);
    if(!document){
      return next(ApiError(404, "Danh mục không được tìm thấy"));
    }
    return res.send({message: "Danh mục được xoá thành công"});
  } catch (error) {
    return next(new ApiError(500, `Không thể xoá danh mục có id=${req.params.id}`));
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
    const traSuaService = new TraSuaService(MongoDB.client);
    const deleteCount = await traSuaService.deleteAll();
    return res.send({
      message: `${deleteCount} danh mục được xoá thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy a lõi khi xoá danh mục"));
  }
};
const ApiError = require("../api-error");
const DanhMucService = require("../services/danhMuc.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if(!req.body?.tenDM){
    return next(new ApiError(400, "Tên danh mục không được trống"));
  }
  try {
    const danhMucService = new DanhMucService(MongoDB.client);
    const document = await danhMucService.create(req.body);
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
    const danhMucService = new DanhMucService(MongoDB.client);
    const {tenDM} = req.query;
    if(tenDM){
      documents = await danhMucService.findByName(tenDM);
    }else{
      documents = await danhMucService.find({});
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
    const danhMucService = new DanhMucService(MongoDB.client);
    const document = await danhMucService.findById(req.params.id);
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
    const danhMucService = new DanhMucService(MongoDB.client);
    const document = await danhMucService.update(req.params.id, req.body);
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
    const danhMucService = new DanhMucService(MongoDB.client);
    const document = await danhMucService.delete(req.params.id);
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
    const danhMucService = new DanhMucService(MongoDB.client);
    const deleteCount = await danhMucService.deleteAll();
    return res.send({
      message: `${deleteCount} danh mục được xoá thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy a lõi khi xoá danh mục"));
  }
};
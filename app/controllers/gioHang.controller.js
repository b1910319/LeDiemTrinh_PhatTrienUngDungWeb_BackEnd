const { Db } = require("mongodb");
const ApiError = require("../api-error");
const GioHangService = require("../services/gioHang.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  try {
    const gioHangService = new GioHangService(MongoDB.client);
    const document = await gioHangService.create(req.body);
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
    const gioHangService = new GioHangService(MongoDB.client);
    documents = await gioHangService.find({tinhTrang: 0});
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm danh mục")
    );
  }
  return res.send(documents);
};
exports.findAll1 = async (req, res, next) => {
  let documents = [];
  try {
    const gioHangService = new GioHangService(MongoDB.client);
    documents = await gioHangService.find({tinhTrang: 1});
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi khi tìm kiếm danh mục")
    );
  }
  return res.send(documents);
};
exports.findOne = async (req, res, next) => {
  try {
    const gioHangService = new GioHangService(MongoDB.client);
    const document = await gioHangService.findById(req.params.id);
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
    const gioHangService = new GioHangService(MongoDB.client);
    const document = await gioHangService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(404, "Danh mục không được tìm thấy"));
    }
    return res.send({message: "Danh mục đã được update"});
  } catch (error) {
    return next(new ApiError(500, `Đã xảy ra lỗi khi update danh mục có id=${req.params.id}`));
  }
};
exports.updateMany = async (req, res, next) => {
  try {
    const gioHangService = new GioHangService(MongoDB.client);
    const document = await gioHangService.updateMany();
    if(!document){
      return next(new ApiError(404, "Danh mục không được tìm thấy"));
    }
    return res.send({message: "Danh mục đã được update"});
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi update danh mục có "));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const gioHangService = new GioHangService(MongoDB.client);
    const document = await gioHangService.delete(req.params.id);
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
    const gioHangService = new GioHangService(MongoDB.client);
    const deleteCount = await gioHangService.deleteAll();
    return res.send({
      message: `${deleteCount} danh mục được xoá thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy a lõi khi xoá danh mục"));
  }
};
exports.deleteAll1 = async (req, res, next) => {
  try {
    const gioHangService = new GioHangService(MongoDB.client);
    const deleteCount = await gioHangService.deleteAll1();
    return res.send({
      message: `${deleteCount} danh mục được xoá thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy a lõi khi xoá danh mục"));
  }
};
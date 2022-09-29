const express = require("express");
const gioHang = require("../controllers/gioHang.controller");
const router = express.Router();
router.route("/")
  .get(gioHang.findAll)
  .post(gioHang.create)
  .put(gioHang.updateMany)
  .delete(gioHang.deleteAll);
router.route("/:id")
  .get(gioHang.findOne)
  .put(gioHang.update)
  .delete(gioHang.delete);
router.route("/all/1").get(gioHang.findAll1);
router.route("/all/1").delete(gioHang.deleteAll1);
module.exports = router;
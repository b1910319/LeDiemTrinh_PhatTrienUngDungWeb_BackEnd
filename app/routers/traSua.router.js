const express = require("express");
const traSua = require("../controllers/traSua.controller");
const router = express.Router();
router.route("/")
  .get(traSua.findAll)
  .post(traSua.create)
  .delete(traSua.deleteAll);
router.route("/:id")
  .get(traSua.findOne)
  .put(traSua.update)
  .delete(traSua.delete);
module.exports = router;
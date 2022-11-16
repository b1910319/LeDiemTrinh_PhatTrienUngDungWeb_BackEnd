const express = require("express");
const cors = require("cors");
const danhMucRouter = require("./app/routers/danhMuc.router");
const traSuaRouter = require("./app/routers/traSua.router");
const gioHangRouter = require("./app/routers/gioHang.router");
const ApiError = require("./app/api-error");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Milk Tea" });
});
app.use("/api/danhMuc", danhMucRouter);
app.use("/api/traSua", traSuaRouter);
app.use("/api/gioHang", gioHangRouter);
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
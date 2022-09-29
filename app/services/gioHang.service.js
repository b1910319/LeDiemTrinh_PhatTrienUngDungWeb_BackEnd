const { ObjectId } = require("mongodb");
class GioHangService {
  constructor(client) {
    this.GioHang = client.db().collection("giohang");
  }
  gioHangData(payload) {
    const gioHang = {
      idTS: payload.idTS,
      tenTS: payload.tenTS,
      soLuongTS: payload.soLuongTS,
      giaTS: payload.giaTS,
      tinhTrang: payload.tinhTrang,
      thoigian: {
        type: Date,
        default: Date.now,
      },
    };
    Object.keys(gioHang).forEach(
      (key) => gioHang[key] === undefined && delete gioHang[key]
    );
    return gioHang;
  }

  async create(payload) {
    const gioHang = this.gioHangData(payload);
    const result = await this.GioHang.findOneAndUpdate(
      gioHang,
      {
        $set: { soLuongTS: gioHang.soLuongTS = 1, tinhTrang: gioHang.tinhTrang = 0 },
        //thêm giờ tự động khi create
        $currentDate: {
          thoigian: true,
        },
      },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.GioHang.find(filter);
    return await cursor.toArray();
  }

  // async findByName(tenTS) {
  //   return await this.find({
  //     tenTS: { $regex: new RegExp(tenTS), $options: "i" },
  //   });
  // }

  async findById(id) {
    return await this.GioHang.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      //ObjectId.isValid(id) kiểm tra id có hợp lệ hay không
    });
  }

  async update(id, payload) {
    //kiểm tra id truyền vào có hợp lệ hay không
    const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null, };
    const update = this.gioHangData(payload);
    const result = await this.GioHang.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async updateMany() {
    //kiểm tra id truyền vào có hợp lệ hay không
    const filter = { tinhTrang: 0, };
    const result = await this.GioHang.updateMany(
      filter,
      { $set: {tinhTrang: 1}},
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async delete(id){
    const result = await this.GioHang.findOneAndDelete({_id: ObjectId.isValid(id) ? new ObjectId(id) : null,});
    return result.value;
  }

  async deleteAll(){
    const filter = { tinhTrang: 0, };
    const result = await this.GioHang.deleteMany(filter);
    return result.deletedCount;
  }
  async deleteAll1(){
    const filter = { tinhTrang: 1, };
    const result = await this.GioHang.deleteMany(filter);
    return result.deletedCount;
  }
}
module.exports = GioHangService;

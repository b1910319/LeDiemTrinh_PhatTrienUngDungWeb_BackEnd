const { ObjectId } = require("mongodb");
class DanhMucService {
  constructor(client) {
    this.DanhMuc = client.db().collection("danhmuc");
  }
  danhMucData(payload) {
    const danhMuc = {
      tenDM: payload.tenDM,
      thoigian: {
        type: Date,
        default: Date.now,
      },
    };
    Object.keys(danhMuc).forEach(
      (key) => danhMuc[key] === undefined && delete danhMuc[key]
    );
    return danhMuc;
  }

  async create(payload) {
    const danhMuc = this.danhMucData(payload);
    const result = await this.DanhMuc.findOneAndUpdate(
      danhMuc,
      {
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
    const cursor = await this.DanhMuc.find(filter);
    return await cursor.toArray();
  }

  async findByName(tenDM) {
    return await this.find({
      tenDM: { $regex: new RegExp(tenDM), $options: "i" },
    });
  }

  async findById(id) {
    return await this.DanhMuc.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      //ObjectId.isValid(id) kiểm tra id có hợp lệ hay không
    });
  }

  async update(id, payload) {
    //kiểm tra id truyền vào có hợp lệ hay không
    const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null, };
    const update = this.danhMucData(payload);
    const result = await this.DanhMuc.findOneAndUpdate(
      filter,
      { $set: update},
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async delete(id){
    const result = await this.DanhMuc.findOneAndDelete({_id: ObjectId.isValid(id) ? new ObjectId(id) : null,});
    return result.value;
  }

  async deleteAll(){
    const result = await this.DanhMuc.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = DanhMucService;

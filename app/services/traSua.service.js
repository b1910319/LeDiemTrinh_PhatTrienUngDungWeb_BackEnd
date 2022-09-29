const { ObjectId } = require("mongodb");
class TraSuaService {
  constructor(client) {
    this.TraSua = client.db().collection("trasua");
  }
  traSuaData(payload) {
    const traSua = {
      tenTS: payload.tenTS,
      giaTS: payload.giaTS,
      idDM: payload.idDM,
      thoigian: {
        type: Date,
        default: Date.now,
      },
    };
    Object.keys(traSua).forEach(
      (key) => traSua[key] === undefined && delete traSua[key]
    );
    return traSua;
  }

  async create(payload) {
    const traSua = this.traSuaData(payload);
    const result = await this.TraSua.findOneAndUpdate(
      traSua,
      {
        $set: { idDM: traSua.idDM = '6325739326850a91d01dee61' },
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
    const cursor = await this.TraSua.find(filter);
    return await cursor.toArray();
  }

  async findByName(tenTS) {
    return await this.find({
      tenTS: { $regex: new RegExp(tenTS), $options: "i" },
    });
  }

  async findById(id) {
    return await this.TraSua.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      //ObjectId.isValid(id) kiểm tra id có hợp lệ hay không
    });
  }

  async update(id, payload) {
    //kiểm tra id truyền vào có hợp lệ hay không
    const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null, };
    const update = this.traSuaData(payload);
    const result = await this.TraSua.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async delete(id){
    const result = await this.TraSua.findOneAndDelete({_id: ObjectId.isValid(id) ? new ObjectId(id) : null,});
    return result.value;
  }

  async deleteAll(){
    const result = await this.TraSua.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = TraSuaService;

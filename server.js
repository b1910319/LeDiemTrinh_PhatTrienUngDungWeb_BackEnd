const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
async function startSerer(){
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connect to the database!");
    const PORT = config.app.port;
    app.listen(PORT, ()=>{
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}
startSerer();

//link git: https://github.com/b1910319/LeDiemTrinh_PhatTrienUngDungWeb_BackEnd
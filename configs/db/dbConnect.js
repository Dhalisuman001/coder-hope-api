import mongoose from "mongoose";
import "dotenv/config";

const DbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, {
      autoIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Db connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;

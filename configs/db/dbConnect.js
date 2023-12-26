import mongoose from "mongoose";
import "dotenv/config";

const DbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, {
      autoIndex: true,
    });
    console.log("Db connected successfully to--> ", process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;

import mongoose from "mongoose";
import "dotenv/config";

const DbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.URL, {
      autoIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;

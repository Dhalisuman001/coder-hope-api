import mongoose from "mongoose";
import "dotenv/config";

const DbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.URL || "mongodb+srv://dhalisuman:TNS9q8OjmXbiBvvs@cluster0.3upcle7.mongodb.net/", {
      autoIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;

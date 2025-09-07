import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL_URI);
  } catch (error) {
    throw Error("Error occured while connecting to database" + error);
  }
};

export { connect };

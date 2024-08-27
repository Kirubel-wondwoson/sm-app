import mongoose from "mongoose";
import configer from "./Keys"; // Ensure this path is correct

const db = configer.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully Connected!");
  } catch (error) {
    console.error("Connection failed:", error.message);
    process.exit(1); // Exit with error code if critical
  }
};

export default connectDB;

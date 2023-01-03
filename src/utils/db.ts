import mongoose from "mongoose";

const connectToDb = async (url: string) => {
  if (!url) {
    console.log("db connection string missing.");
    process.exit(1);
  }
  await mongoose.connect(url); // error is catched in the "app.ts"
  console.log("mongoose connected");
};

export default connectToDb;

import mongoose from "mongoose";
import log from "./logger";

const connectToDb = async (url: string) => {
  if (!url) {
    log.info("db connection string missing.");
    process.exit(1);
  }
  await mongoose.connect(url); // error is catched in the "app.ts"
  log.info("mongoose connected");
};

export default connectToDb;

import express from "express";
import config from "config";
import connectToDb from "./utils/db";

// DECLARATIONS
const port = config.get<number>("port");
const mongoUrl = config.get<string>("mongoUrl");

const app = express();

const start = async (mongoUrl: string) => {
  try {
    await connectToDb(mongoUrl);
    app.listen(port, () => console.log(`server started at ${port}`));
  } catch (error: any) {
    console.log(error.message);
  }
};

start(mongoUrl);

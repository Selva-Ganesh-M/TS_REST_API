import express from "express";
import config from "config";
import connectToDb from "./utils/db";
import log from "./utils/logger";
import { router } from "./routes";

// DECLARATIONS
const port = config.get<number>("port");
const mongoUrl = config.get<string>("mongoUrl");

const app = express();

const start = async (mongoUrl: string) => {
  try {
    // mongoose connection
    await connectToDb(mongoUrl);
    // setting routes
    router(app);
    // server listening
    app.listen(port, () => log.info(`server started at ${port}`));
  } catch (error: any) {
    log.error(error.message);
  }
};
export default app;
start(mongoUrl);

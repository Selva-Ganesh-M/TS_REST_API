import express, { NextFunction, Request, Response } from "express";
import config from "config";
import connectToDb from "./utils/db";
import log from "./utils/logger";
import { router } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

// DECLARATIONS
const port = config.get<number>("port");
const mongoUrl = config.get<string>("mongoUrl");

const app = express();

// IMP MIDDLEWARES
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(express.json());

const start = async (mongoUrl: string) => {
  try {
    // mongoose connection
    await connectToDb(mongoUrl);
    // setting routes
    app.use((req: Request, res: Response, next: NextFunction) => {
      log.info("log.req.body", req.body);

      next();
    });
    router(app);
    // server listening
    app.listen(port, () => log.info(`server started at ${port}`));
  } catch (error: any) {
    log.error(error.message);
  }
};
export default app;
start(mongoUrl);

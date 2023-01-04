import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import log from "../utils/logger";
import { TRawCreateUserValidatorBody } from "../utils/Types";

const validate =
  (schema: AnyZodObject) =>
  (
    req: Request<{}, {}, TRawCreateUserValidatorBody>,
    res: Response,
    next: NextFunction
  ) => {
    log.info("req.body:", req.body);
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (e: any) {
      log.error(e.message);
      return res.status(400).json(e.message);
    }
  };

export default validate;

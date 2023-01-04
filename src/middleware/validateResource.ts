import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import log from "../utils/logger";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
    } catch (e: any) {
      log.error(e.message);
      return res.status(400).json(e.message);
    }
  };

export default validate;

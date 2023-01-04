import app from "./app";
import { Express, NextFunction, Request, Response } from "express";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schemas/user.schema";
import { createUserHandler } from "./controller/user.controller";

export const router = (app: Express) => {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.status(200).json("server is running");
  });
  app.post("/api/users", validate(createUserSchema), createUserHandler);
};

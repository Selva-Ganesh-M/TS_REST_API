import app from "./app";
import { Express, NextFunction, Request, Response } from "express";

export const router = (app: Express) => {
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log("here");

    res.status(200).json("ooo");
  });
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.status(200).json("server is running");
  });
};

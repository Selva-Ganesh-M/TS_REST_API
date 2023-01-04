import { Request, Response } from "express";
import { createUser } from "../services/user.services";
import log from "../utils/logger";
import { TCreateUserBody } from "../utils/Types";

export const createUserHandler = async (
  req: Request<{}, {}, TCreateUserBody>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    log.error(error.message);
    return res.status(400).json(error.message);
  }
};

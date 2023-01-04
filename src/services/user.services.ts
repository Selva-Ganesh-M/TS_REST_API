import mongoose, { DocumentDefinition } from "mongoose";
import userModel, { IUserDoc } from "../models/user.model";
import { TCreateUserBody } from "../utils/Types";
// type a = DocumentDefinition<IUserDoc>
{
  /* DocumentDefinition just omits all the attributes present in the mongoose.document and returns the clean type of the generic Interface */
}

export const createUser = async (input: TCreateUserBody) => {
  const user = await userModel.create(input);
  if (!user) throw new Error("User creation failed");
  return user;
};

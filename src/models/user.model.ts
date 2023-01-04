import mongoose, { StringSchemaDefinition, Types } from "mongoose";
import bcrypt from "bcrypt";

//INTERFACE
export interface IUserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<Boolean>;
}

// SCHEMA CREATION
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// PRE FUNCTION
userSchema.pre("save", async (next) => {
  const user = this as unknown as IUserDoc;
  {
    /* 
    cause
    "this as IUserDoc" directyly violates the ts comparison mechanism. But
    "this as unknown as IUserDoc" works cause the unknown type element can be of any of the Types.
    */
  }
  if (!user.isModified) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

// USER METHODS
userSchema.methods.comparePassword = async (candidatePassword: string) => {
  const user = this as unknown as IUserDoc;
  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e) => false);
  {
    /* bcrypt.compare may return true or false if the function executed successfully.
There may be a possibility that the function will throw an error. So we have to somehow handle that too */
  }
};

// MODEL CREATION
const userModel = mongoose.model("User", userSchema);

export default userModel;

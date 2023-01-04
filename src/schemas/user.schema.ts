import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    // name
    name: string({
      required_error: "Name is a required field",
    }),
    // password
    password: string({
      required_error: "Name is a required field",
    }).min(
      6,
      "password too short. please provide a minimum of six digit password."
    ),
    // confirm password
    confirmPassword: string({
      required_error: "confirm password is a required field",
    }),
    // email
    email: string({
      required_error: "Email is a required field",
    }).email("Invalid email addresss."),
  })
    //   refining
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords doesn't match",
      path: ["confirmPassword"],
    }),
});

// type a = typeof createUserSchema
{
  /* In the above line, typeof "a" has a lot of other properties and methods of the zod */
}

export type createUserServiceInputType = TypeOf<typeof createUserSchema>;
{
  /* "TypeOf" from the zod removes all the zod properties and methods to give us a clean type definition */
}

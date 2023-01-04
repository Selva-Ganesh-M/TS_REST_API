export type TRawCreateUserValidatorBody = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TCreateUserBody = Omit<
  TRawCreateUserValidatorBody,
  "confirmPassword"
>;

import { isValidObjectId } from "mongoose";
import { object, ref, string, array, number } from "yup";

export const createUserSchema = object({
  body: object({
    name: string()
      .required("Name is required")
      .min(5, "Name is too short")
      .max(20, "Name is too Long"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 characters")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    passwordConfirmation: string()
      .required("passwordConfirmation is required")
      .oneOf([ref("password"), null], "Password must match"),
    email: string().required("Email is required").email("Must be a valid email address"),
  }),
});

export const loginUserSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be more than 6 characters")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    email: string().required("Email is required").email("Must be a valid email address"),
  }),
});

export const updateUserSchema = object({
  body: object({
    name: string().min(5, "Name is too short").max(20, "Name is too Long"),
    email: string().email("Must be a valid email address"),
    // hobby: array()
    //   .of(
    //     string().test({
    //       message: "IdHobby must be a uuid",
    //       test: (value) => {
    //         return isValidObjectId(value);
    //       },
    //     }),
    //   )
    //   .typeError("Hobby must be a array of id hobby!"),
    admin: string(),
    age: number(),
  }),
});

export const refreshTokenUserSchema = object({
  body: object({
    refreshToken: string().required("refreshToken is required"),
  }),
});

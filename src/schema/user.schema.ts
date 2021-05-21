import { object, ref, string } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required")
            .min(5, "Name is too short")
            .max(20, "Name is too Long"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 characters")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: string().required("passwordConfirmation is required").oneOf(
            [ref("password"), null],
            "Password must match"
        ),
        email: string()
            .required("Email is required")
            .email("Must be a valid email address")
    })
})
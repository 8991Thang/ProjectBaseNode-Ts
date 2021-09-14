"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenUserSchema = exports.updateUserSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const mongoose_1 = require("mongoose");
const yup_1 = require("yup");
exports.createUserSchema = yup_1.object({
    body: yup_1.object({
        name: yup_1.string().required("Name is required")
            .min(5, "Name is too short")
            .max(20, "Name is too Long"),
        password: yup_1.string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 characters")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: yup_1.string().required("passwordConfirmation is required").oneOf([yup_1.ref("password"), null], "Password must match"),
        email: yup_1.string()
            .required("Email is required")
            .email("Must be a valid email address")
    })
});
exports.loginUserSchema = yup_1.object({
    body: yup_1.object({
        password: yup_1.string()
            .required("Password is required")
            .min(6, "Password is too short - should be more than 6 characters")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        email: yup_1.string()
            .required("Email is required")
            .email("Must be a valid email address")
    })
});
exports.updateUserSchema = yup_1.object({
    body: yup_1.object({
        name: yup_1.string()
            .min(5, "Name is too short")
            .max(20, "Name is too Long"),
        email: yup_1.string()
            .email("Must be a valid email address"),
        hobby: yup_1.array().of(yup_1.string().test({
            message: "IdHobby must be a uuid",
            test: (value) => {
                return mongoose_1.isValidObjectId(value);
            },
        })).typeError('Hobby must be a array of id hobby!'),
        admin: yup_1.string(),
        age: yup_1.number()
    })
});
exports.refreshTokenUserSchema = yup_1.object({
    body: yup_1.object({
        refreshToken: yup_1.string()
            .required("refreshToken is required"),
    })
});

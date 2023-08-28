import * as yup from "yup";

export const signupSchema = yup.object({
  username: yup
    .string()
    .required("Please provide a username")
    .matches(/^\S*$/, "Username cannot contain spaces")
    .min(4, "Username must be at least 4 characters long")
    .max(10, "Username can't be more than 10 characters long"),
  email: yup
    .string()
    .email("Please provide the valid email")
    .required("Please povide a email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/g,
      "Please Enter the valid email format"
    ),
  password: yup
    .string()
    .required("Please provide a password")
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password can't more than 15 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,|\~`[\]\\[=-]).{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please provide a confirm password"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please provide the valid email")
    .required("Please povide a email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/g,
      "Please Enter the valid email format"
    ),
  password: yup
    .string()
    .required("Please provide a password")
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password can't more than 15 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,|\~`[\]\\[=-]).{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
});

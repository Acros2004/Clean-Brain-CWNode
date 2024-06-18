import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";

export const signInSchema = Yup.object({
  body: Yup.object({
    login: Yup.string().required().matches(/^[a-zA-Z0-9]{1,13}$/),
    password: Yup.string().required().matches(/^[a-zA-Z0-9]{4,13}$/),
    Id_Auth: Yup.number().required(),
    Code_Client: Yup.number().required()
  })   
})
export const emailCodeSignInSchema = Yup.object({
  body: Yup.object({
    login: Yup.string().required().matches(/^[a-zA-Z0-9]{1,13}$/),
    password: Yup.string().required().matches(/^[a-zA-Z0-9]{4,13}$/),
  })   
})
export const emailCodeSignUpSchema = Yup.object({
  body: Yup.object({
    Mail_Client: Yup.string().required().matches(/^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]{1,10}\.[a-zA-Z]{2,3}$/),
    Login_Client: Yup.string().required().matches(/^[a-zA-Z0-9]{1,13}$/),
  })
});

export const signUpSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().required().matches(/^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]{1,10}\.[a-zA-Z]{2,3}$/),
    login: Yup.string().required().matches(/^[a-zA-Z0-9]{1,13}$/),
    password: Yup.string().required().matches(/^[a-zA-Z0-9]{4,13}$/),
    Id_Auth: Yup.number().required(),
    Code_Client: Yup.number().required()
  })
});

export const logoutSchema = Yup.object({
  cookies: Yup.object({
    refreshToken: Yup.string().required(),
  }),
})

class AuthValidator {
  static async sendEmailCodeSignIn(req, res, next) {
    return validateRequest(req, res, next, emailCodeSignInSchema);
  }
  static async sendEmailCodeSignUp(req, res, next) {
    return validateRequest(req, res, next, emailCodeSignUpSchema);
  }
  static async signIn(req, res, next) {
    return validateRequest(req, res, next, signInSchema);
  }
  static async signUp(req, res, next) {
    return validateRequest(req, res, next, signUpSchema);
  }
  static async logOut(req, res, next) {
    return validateRequest(req, res, next, logoutSchema);
  }
  static async refresh(req, res, next) {
    return validateRequest(req, res, next);
  }
}

export default AuthValidator;

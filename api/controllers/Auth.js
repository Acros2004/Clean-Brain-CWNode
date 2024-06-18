import AuthService from "../services/Auth.js";
import ErrorsUtils from "../utils/Errors.js";
import { COOKIE_SETTINGS } from "../constants.js";
import EmailAuthenticationService from "../services/EmailAuthentication.js";

class AuthController {
  
  static async sendEmailCodeSignUp(req,res) {
    const { Mail_Client, Login_Client } = req.body;
    try{
      const Id_Auth = await EmailAuthenticationService.sendEmailCodeSignUp(Mail_Client,Login_Client);
      return res.status(200).json({ Id_Auth });
    }catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async sendEmailCodeSignIn(req,res) {
    const { login, password } = req.body;
    try{
      const Id_Auth = await EmailAuthenticationService.sendEmailCodeSignIn(login, password);
      return res.status(200).json({ Id_Auth });
    }catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signIn(req, res) {
    const { login, password, Id_Auth, Code_Client } = req.body;
    const { fingerprint } = req;
    try {
      const { accessToken, refreshToken, accessTokenExpiration, user } = await AuthService.signIn( login, password, fingerprint , Id_Auth, Code_Client);
      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      const outputUser = {Id_client: user.Id_client, Name_Client: user.Name_Client, Surname_Client: user.Surname_Client,Photo_Client: user.Photo_Client, Mail_Client: user.Mail_Client,Role_Client: user.Role_Client}
      return res.status(200).json({ accessToken, accessTokenExpiration, outputUser });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signUp(req, res) {
    const { email, login, password, Id_Auth, Code_Client } = req.body;
    const { fingerprint } = req;
    try {
      const { accessToken, refreshToken, accessTokenExpiration, user } = await AuthService.signUp( email, login, password, fingerprint,Id_Auth, Code_Client);

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      
      const outputUser = {Id_client: user.Id_client, Name_Client: user.Name_Client, Surname_Client: user.Surname_Client, Photo_Client: user.Photo_Client, Mail_Client: user.Mail_Client,Role_Client: user.Role_Client}
      return res.status(200).json({ accessToken, accessTokenExpiration, outputUser });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken;

    try {
      await AuthService.logOut(refreshToken);
      
      res.clearCookie("refreshToken")
      
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req;
    const currentRefreshToken = req.cookies.refreshToken;
    try {
      const {accessToken, refreshToken, accessTokenExpiration, user} =
      await AuthService.refresh({
        currentRefreshToken,
        fingerprint,
      });
      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      const outputUser = {Id_client: user.Id_client, Name_Client: user.Name_Client, Surname_Client: user.Surname_Client, Photo_Client: user.Photo_Client, Mail_Client: user.Mail_Client,Role_Client: user.Role_Client}
      return res.status(200).json({accessToken, accessTokenExpiration, outputUser});
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;

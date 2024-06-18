import bcrypt from "bcryptjs";
import TokenService from "./Token.js";
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js";
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js";
import StaticClass from "../static/StaticClass.js";
import cloudinary from "cloudinary"
import EmailAuthenticationService from "./EmailAuthentication.js";

class AuthService {
  static async signIn( Login_Client, password, fingerprint, Id_Auth, Code_Client) {
    const userData = await StaticClass.unit.clientRepository.findByLogin(Login_Client);
    if(userData.length == 0){
      throw new NotFound("Пользователь не найден");
    }
    const isPasswordValid = bcrypt.compareSync(password, userData[0].Password_Client);
    if(!isPasswordValid){
      throw new Unauthorized("Неверный логин или пароль");
    }
    await EmailAuthenticationService.verifyEmailCode(Id_Auth, Code_Client, userData[0].Mail_Client)
    const payload = { Id_client: userData[0].Id_client, Role_Client: userData[0].Role_Client, Login_Client }
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);
    await StaticClass.unit.refreshSessionRepository.createRefreshSession({client_id: userData[0].Id_client, refresh_token: refreshToken, finger_print: fingerprint.hash});
    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      user : userData[0]
    };
  }

  static async signUp( Mail_Client, Login_Client, password, fingerprint, Id_Auth, Code_Client) {
    const userData =   await StaticClass.unit.clientRepository.findByLogin(Login_Client);
    if (userData.length != 0){
      throw new Conflict("Пользователь с таким именем уже существует");
    }
    const userDataEmail =   await StaticClass.unit.clientRepository.findByEmail(Mail_Client);
    if (userDataEmail.length != 0){
      throw new Conflict("Пользователь с такой почтой уже существует");
    }
    await EmailAuthenticationService.verifyEmailCode(Id_Auth, Code_Client, Mail_Client)
    
    const myCloud = await cloudinary.v2.uploader.upload("./images/bear.png")
    const Photo_Client = myCloud.secure_url;
    const Name_Client = "Name";
    const Surname_Client = "Surname";
    const Role_Client = "Client";
    const Password_Client = bcrypt.hashSync(password,8);
    const user = await StaticClass.unit.clientRepository.create({Name_Client,Surname_Client,Login_Client,Password_Client,Photo_Client,Mail_Client,Role_Client });

    const payload = { Id_client: user.Id_client, Role_Client, Login_Client };
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);
    await StaticClass.unit.refreshSessionRepository.createRefreshSession({client_id: payload.Id_client, refresh_token: refreshToken, finger_print: fingerprint.hash});

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      user
    };
  }

  static async logOut(refreshToken) {
    await StaticClass.unit.refreshSessionRepository.deleteRefreshSession(refreshToken);
  }

  static async refresh({ fingerprint, currentRefreshToken }) {
    if(!currentRefreshToken){
      throw new Unauthorized();
    }

    const refreshSession = await StaticClass.unit.refreshSessionRepository.getRefreshSession(currentRefreshToken);
    if(refreshSession.length == 0){
      throw new Unauthorized();
    }
    if(refreshSession[0].finger_print !== fingerprint.hash){
      throw new Forbidden();
    }

    await StaticClass.unit.refreshSessionRepository.deleteRefreshSession(currentRefreshToken);
    
    let payload;
    try{
      payload = await TokenService.verifyRefreshToken(currentRefreshToken);
    }catch (error){
      throw new Forbidden(error);
    }

    const user = await StaticClass.unit.clientRepository.findByLogin(payload.Login_Client);
  
    const actualPayload = { Id_client : user[0].Id_client,Login_Client: user[0].Login_Client, Role_Client: user[0].Role_Client};

    const accessToken = await TokenService.generateAccessToken(actualPayload);
    const refreshToken = await TokenService.generateRefreshToken(actualPayload);
    
    await StaticClass.unit.refreshSessionRepository.createRefreshSession({client_id: user[0].Id_client, refresh_token: refreshToken, finger_print: fingerprint.hash});
  
    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      user: user[0]
    };
  }
}

export default AuthService;

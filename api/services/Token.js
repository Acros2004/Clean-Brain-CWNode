import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Forbidden, Unauthorized } from "../utils/Errors.js";

dotenv.config();

class TokenService {
  static async generateAccessToken(payload) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn: "30m",
    })
  }

  static async generateRefreshToken(payload) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
      expiresIn: "15d",
    })
  }

  static async socketCheckAccess(socket, next) {
    const authHeader = socket.handshake.headers.authorization;
    const token = authHeader?.split(" ")?.[1];
    try {
      if (!token) {
        throw new Error("Пользователь неавторизирован");
      }
      socket.user = await TokenService.verifyAccessToken(token);
      next();
    } catch (error) {
      console.error("Ошибка при проверке доступа:", error.message);
      next(error)
    }
  }
  

  static async checkAccess(req, _, next) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")?.[1];

    if(!token){
      return next(new Unauthorized());
    }
    try{
      req.user = await TokenService.verifyAccessToken(token);
    } catch (error){
      console.log(error);
      return next(new Forbidden(error));
    }

    next();
  }
  static async checkAccessAdmin(req, _, next) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")?.[1];

    if(!token){
      return next(new Unauthorized());
    }
    try{
      req.user = await TokenService.verifyAccessToken(token);
      if(req.user.Role_Client !== "Admin")
        throw Error("Отказано в доступе")
    } catch (error){
      console.log(error);
      return next(new Forbidden(error));
    }

    next();
  }

  static async checkAccessNotAdmin(req, _, next) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")?.[1];

    if(!token){
      return next(new Unauthorized());
    }
    try{
      req.user = await TokenService.verifyAccessToken(token);
      if(req.user.Role_Client !== "Client")
        throw Error("Отказано в доступе")
    } catch (error){
      console.log(error);
      return next(new Forbidden(error));
    }

    next();
  }

  static async verifyAccessToken(accessToken){
    return await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }

  static async verifyRefreshToken(refreshToken){
    return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  }
}

export default TokenService;

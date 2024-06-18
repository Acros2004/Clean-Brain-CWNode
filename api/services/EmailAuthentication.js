import StaticClass from "../static/StaticClass.js";
import bcrypt from "bcryptjs";
import { sendMessageToEmail } from "../utils/Nodemailer.js";
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js";

class EmailAuthenticationService{
    static async sendEmailCodeSignUp(Mail_Client, Login_Client){
          const userDataEmail = await StaticClass.unit.clientRepository.findByEmail(Mail_Client);
          if (userDataEmail.length != 0){
            throw new Conflict("Пользователь с такой почтой уже существует");
          }
          const userDataLogin = await StaticClass.unit.clientRepository.findByLogin(Login_Client);
          if (userDataLogin.length != 0){
            throw new Conflict("Пользователь с таким логином уже существует");
          }
          const userEmailAuth = await StaticClass.unit.emailAuthenticationRepository.findByEmail(Mail_Client);
          const Code_Client = Math.floor(100000 + Math.random() * 900000);
          let emailAuth = {};
          if (userEmailAuth.length != 0){
            await StaticClass.unit.emailAuthenticationRepository.update(userEmailAuth[0].Id_Auth,{Date_Auth: new Date(), Code_Client});
            emailAuth = await StaticClass.unit.emailAuthenticationRepository.findById(userEmailAuth[0].Id_Auth);
          }
          else
            emailAuth = await StaticClass.unit.emailAuthenticationRepository.create({Mail_Client,Date_Auth: new Date(), Code_Client});
          
          sendMessageToEmail(Mail_Client,"Authentication",StaticClass.getAuthMessage(Code_Client));
          return emailAuth.Id_Auth;
    }

    static async sendEmailCodeSignIn(Login_Client,Password_Client){
        const userData =   await StaticClass.unit.clientRepository.findByLogin(Login_Client);
        if(userData.length == 0){
            throw new NotFound("Пользователь не найден");
        }
        const isPasswordValid = bcrypt.compareSync(Password_Client, userData[0].Password_Client);
        if(!isPasswordValid){
            throw new Unauthorized("Неверный логин или пароль");
        }
        const userEmailAuth = await StaticClass.unit.emailAuthenticationRepository.findByEmail(userData[0].Mail_Client);
        const Code_Client = Math.floor(100000 + Math.random() * 900000);
        let emailAuth = {};
        if (userEmailAuth.length !== 0){
          await StaticClass.unit.emailAuthenticationRepository.update(userEmailAuth[0].Id_Auth,{Date_Auth: new Date(), Code_Client});
          emailAuth = await StaticClass.unit.emailAuthenticationRepository.findById(userEmailAuth[0].Id_Auth);
        }
        else
          emailAuth = await StaticClass.unit.emailAuthenticationRepository.create({Mail_Client: userData[0].Mail_Client,Date_Auth: new Date(), Code_Client});
        sendMessageToEmail(userData[0].Mail_Client,"Authentication",StaticClass.getAuthMessage(Code_Client));
        
        return emailAuth.Id_Auth;
  }

    static async verifyEmailCode(Id_Auth,Code_Client, Mail_Client){

        const userDataEmail = await StaticClass.unit.emailAuthenticationRepository.findById(Id_Auth);
        if(!userDataEmail){
          throw new NotFound("Пользователь не проходил аутентификацию");
        }
        if(userDataEmail.Mail_Client !== Mail_Client)
            throw new Conflict("Несовпадение почты");
        const codeExpirationTime  = new Date(userDataEmail.Date_Auth);
        codeExpirationTime.setMinutes(codeExpirationTime.getMinutes() + 5);
        const currentTime = new Date();
        if(currentTime.getTime() < codeExpirationTime.getTime()){
          if(Code_Client === userDataEmail.Code_Client)
            return true;
          else
            throw new Conflict("Несовпадение кода");
        }
        else{
          throw new Conflict("Код недействительный");
        }
      }
}

export default EmailAuthenticationService;
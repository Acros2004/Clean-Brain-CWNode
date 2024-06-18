import React, {useContext, useState} from "react";
import {FaUser, FaLock} from "react-icons/fa"
import { MdAttachEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import StaticClass from "../../../static/StaticClass";
import '../Registration/RegPage.css'

const LogPage = () => {
    const navigate = useNavigate();
    const {handleSignIn,handleSignInCode} = useContext(AuthContext);
    const [isContinueForm, setIsContinueForm] = useState(false);
    const [errorLog,setErrorLog] = useState({error: ""})

    const [verifyLogData,setVerifyLogData] = useState({
        logLogin:true,
        logPassword:true,
        Code_Client:true
    })

    const [loginData, setLoginData] = useState({
        logLogin: "",
        logPassword: "",
        Id_Auth: "",
        Code_Client: ""
      });
    
    // Обработчик изменения полей ввода
    const handleInputLogChange = (e) => {
        const { name, value } = e.target;
        if(name === "logLogin"){
            if(StaticClass.regexLogin.test(value))
            setVerifyLogData({...verifyLogData,[name]: false})
            else
            setVerifyLogData({...verifyLogData,[name]: true})
        }else if(name === "logPassword"){
            if(StaticClass.regexPassword.test(value))
            setVerifyLogData({...verifyLogData,[name]: false})
            else
            setVerifyLogData({...verifyLogData,[name]: true})
        }else if(name === "Code_Client"){
            if(StaticClass.regexCode.test(value))
            setVerifyLogData({...verifyLogData,[name]: false})
            else
            setVerifyLogData({...verifyLogData,[name]: true})
        }
        setLoginData({...loginData,[name]:value})
        };
        const handleEmail = async (e) =>{
            e.preventDefault();
            setErrorLog({error:""})
            try{
                if(StaticClass.regexLogin.test(loginData.logLogin) && StaticClass.regexPassword.test(loginData.logPassword))
                    await handleSignInCode({login: loginData.logLogin, password:loginData.logPassword}).then(res =>{
                        setLoginData({...loginData,Id_Auth: res.data.Id_Auth})
                    });
            } catch (error) {
                setErrorLog({ error: error.response.data.error});
            }
        }

        const handleSubmitLogin = async (e) => {
            e.preventDefault();
            setErrorLog({error:""})
            try {
                if(isContinueForm){
                    if (StaticClass.regexCode.test(loginData.Code_Client) && StaticClass.regexLogin.test(loginData.logLogin) && StaticClass.regexPassword.test(loginData.logPassword)) {
                        await handleSignIn(loginData);
    
                        setLoginData({
                                logLogin: "",
                                logPassword: "",
                                Id_Auth: "",
                                Code_Client: ""
                            });
                        setErrorLog({error:""})
                        setIsContinueForm(false);
                        navigate("/home");
                    }
                }
                else{
                    if(StaticClass.regexLogin.test(loginData.logLogin) && StaticClass.regexPassword.test(loginData.logPassword))
                    await handleSignInCode({login: loginData.logLogin, password:loginData.logPassword}).then(res =>{
                        setLoginData({...loginData,Id_Auth: res.data.Id_Auth})
                        setIsContinueForm(true);
                    });
                }
                
            } catch (error) {
                setErrorLog({ error: error.response.data.error});
            }
        };
        return(
            <div className="container-login">
                <div className="wrapper">
                <form onSubmit={handleSubmitLogin}>
                    <h1>Авторизация</h1>
                    <p className="reg-error" style={{ display: errorLog.error ? 'block' : 'none' }}>{errorLog.error}</p>
                    <div className="input-box">
                        <input 
                        className={`${verifyLogData.logLogin ? 'warning-log' : ''}`}
                        type="text"
                        name="logLogin"
                        value={loginData.logLogin}
                        onChange={handleInputLogChange}
                        autoComplete="off" 
                        placeholder="Login"
                        readOnly={isContinueForm} 
                        required/>
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input 
                        className={`${verifyLogData.logPassword ? 'warning-log' : ''}`}
                        type="password" 
                        name="logPassword"
                        value={loginData.logPassword}
                        onChange={handleInputLogChange}
                        autoComplete="off" 
                        placeholder="Password" 
                        readOnly={isContinueForm}
                        required/>
                        <FaLock className="icon"/>
                    </div>
                    {
                        isContinueForm &&
                        <>
                            <div className="input-box input-code">
                                <input 
                                type="text" 
                                name="Code_Client"
                                className={`${verifyLogData.Code_Client ? 'warning-log' : ''}`}
                                value={loginData.Code_Client}
                                onChange={handleInputLogChange}
                                autoComplete="off" 
                                placeholder="Code" 
                                required/>
                                <FaLock className="icon"/>
                            </div>
                            <div className="login-get-sms" onClick={handleEmail}>Получить код ещё раз</div>
                        </>
                    }
                    <button type="submit">{isContinueForm ? "Войти" : "Продолжить"}</button>
                    <div className="register-link">
                        <p>У вас нет аккаунта? <Link to="/register">Создать</Link></p>
                    </div>
                </form>
                </div>
            </div>
            
        )
}

export default LogPage;

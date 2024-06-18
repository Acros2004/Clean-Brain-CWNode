import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import {FaUser, FaLock} from "react-icons/fa"
import { MdAttachEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import StaticClass from "../../../static/StaticClass";
import './RegPage.css'
import { AuthContext } from "../../../context/AuthContext";


const RegPage = () => {
    const navigate = useNavigate();
    const {handleSignUp, handleSignUpCode} = useContext(AuthContext);

    const [errorReg,setErrorReg] = useState({error: ""})
    const [isContinueForm, setIsContinueForm] = useState(false);
    const [verifyRegData,setVerifyRegData] = useState({
        regMail:true,
        regLogin:true,
        regPassword:true,
        Code_Client:true
    })

    const [registerData, setRegisterData] = useState({
        regMail: "",
        regLogin: "",
        regPassword: "",
        Id_Auth: "",
        Code_Client: ""
      });
    
    // Обработчик изменения полей ввода
    const handleInputRegChange = (e) => {
        const { name, value } = e.target;
        if(name === "regMail"){
            if(StaticClass.regexMail.test(value))
                setVerifyRegData({...verifyRegData,[name]: false})
            else
                setVerifyRegData({...verifyRegData,[name]: true})
        }else if(name === "regLogin"){
            if(StaticClass.regexLogin.test(value))
            setVerifyRegData({...verifyRegData,[name]: false})
            else
            setVerifyRegData({...verifyRegData,[name]: true})
        }else if(name === "regPassword"){
            if(StaticClass.regexPassword.test(value))
            setVerifyRegData({...verifyRegData,[name]: false})
            else
            setVerifyRegData({...verifyRegData,[name]: true})
        } else if(name === "Code_Client"){
            if(StaticClass.regexCode.test(value))
                setVerifyRegData({...verifyRegData,[name]: false})
            else
                setVerifyRegData({...verifyRegData,[name]: true})
        }
        setRegisterData({...registerData,[name]:value})
        };
    
        const handleEmail = async (e) =>{
            e.preventDefault();
            setErrorReg({error:""})
            try{
                if(StaticClass.regexMail.test(registerData.regMail) && StaticClass.regexLogin.test(registerData.regLogin) && StaticClass.regexPassword.test(registerData.regPassword))
                    await handleSignUpCode({Mail_Client: registerData.regMail, Login_Client:registerData.regLogin}).then(res =>{
                        setRegisterData({...registerData,Id_Auth: res.data.Id_Auth});
                    })
            } catch (error) {
                setErrorReg({ error: error.response.data.error});
            }
        }

    const handleRegSubmit = async (e) => {
        e.preventDefault(); 
        setErrorReg({error:""})
        try {
            if(isContinueForm){
                if(StaticClass.regexCode.test(registerData.Code_Client) && StaticClass.regexMail.test(registerData.regMail) && StaticClass.regexLogin.test(registerData.regLogin) && StaticClass.regexPassword.test(registerData.regPassword)){
                    await  handleSignUp(registerData);
                    setRegisterData({
                            regMail: "",
                            regLogin: "",
                            regPassword: "",
                            Id_Auth: "",
                            Code_Client: ""
                        });
                    setErrorReg({error:""})
                    setIsContinueForm(false);
                    navigate("/home")
                }
            }
            else{
                if(StaticClass.regexMail.test(registerData.regMail) && StaticClass.regexLogin.test(registerData.regLogin) && StaticClass.regexPassword.test(registerData.regPassword))
                    await handleSignUpCode({Mail_Client: registerData.regMail, Login_Client:registerData.regLogin}).then(res =>{
                        setRegisterData({...registerData,Id_Auth: res.data.Id_Auth});
                        setIsContinueForm(true);
                    })
            }
            
        } catch (error) {
            setErrorReg({ error: error.response.data.error});

        }
    };

        return(
            <div className="container-login">
                <div className="wrapper">
                <form onSubmit={handleRegSubmit}>
                    <h1>Регистрация</h1>
                    <p className="reg-error" style={{ display: errorReg.error ? 'block' : 'none' }}>{errorReg.error}</p>
                    <div className="input-box">
                        <input
                         className={`${verifyRegData.regMail ? 'warning-reg' : ''}`}
                         type="text"
                         name="regMail"
                         value={registerData.regMail}
                         onChange={handleInputRegChange}
                         autoComplete="off"
                         placeholder="Email"
                         readOnly={isContinueForm}
                         required/>
                        <MdAttachEmail   className="icon"/>
                    </div>
                    <div className="input-box">
                        <input 
                        className={`${verifyRegData.regLogin ? 'warning-reg' : ''}`}
                        type="text"
                        name="regLogin"
                        value={registerData.regLogin}
                        onChange={handleInputRegChange}
                        autoComplete="off" 
                        placeholder="Login"
                        readOnly={isContinueForm} 
                        required/>
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input 
                        className={`${verifyRegData.regPassword ? 'warning-reg' : ''}`}
                        type="password" 
                        name="regPassword"
                        value={registerData.regPassword}
                        onChange={handleInputRegChange}
                        autoComplete="off" 
                        placeholder="Password" 
                        readOnly={isContinueForm}
                        required/>
                        <FaLock className="icon"/>
                    </div>
                    {
                        isContinueForm && <>
                        <div className="input-box input-code">
                            <input 
                            type="text" 
                            name="Code_Client"
                            className={`${verifyRegData.Code_Client ? 'warning-reg' : ''}`}
                            value={registerData.Code_Client}
                            onChange={handleInputRegChange}
                            autoComplete="off" 
                            placeholder="Code" 
                            required/>
                            <FaLock className="icon"/>
                        </div>
                        <div className="login-get-sms" onClick={handleEmail}>Получить код ещё раз</div>
                        </>
                    }
                    <button type="submit">{isContinueForm ? "Создать" : "Продолжить"}</button>
                    <div className="register-link">
                        <p>У вас есть аккаунта? <Link to="/login">Войти</Link></p>
                    </div>
                </form>
                </div>
            </div>)
}

export default RegPage;

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config.js";
import inMemoryJWTService from "../services/inMemoryJWTService.js";
import { useDispatch } from "react-redux";
import { clearCurrentUserState, setCurrentUserState } from "../states/storeSlice/currentUserSlice.js";

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
})


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  let refreshAttempted = false;
  // const [refreshAttempted, setRefreshAttempted] = useState(false);
  const dispatch = useDispatch();
  

  const handleLogOut = () => {
    AuthClient.post("/logout").then(() =>{
        inMemoryJWTService.deleteToken();
        dispatch(clearCurrentUserState())
        setIsUserLogged(false);
    })
    .catch((e) => {
        console.log(e)
    });
  };

  const handleSignUp = (data) => {
    return AuthClient.post("/sign-up", {email: data.regMail, login: data.regLogin, password: data.regPassword, Id_Auth: data.Id_Auth, Code_Client: parseInt(data.Code_Client)}).then((res) =>{
        const {accessToken, accessTokenExpiration, outputUser} = res.data;
        inMemoryJWTService.setToken(accessToken, accessTokenExpiration);
        dispatch(setCurrentUserState(outputUser))
        setIsUserLogged(true);
    });
  };

  const handleSignIn = (data) => {
    return AuthClient.post("/sign-in", {login: data.logLogin, password: data.logPassword, Id_Auth: data.Id_Auth, Code_Client: parseInt(data.Code_Client)}).then((res) =>{
        const {accessToken, accessTokenExpiration, outputUser} = res.data;
        inMemoryJWTService.setToken(accessToken, accessTokenExpiration);
        dispatch(setCurrentUserState(outputUser))
        setIsUserLogged(true);
      });
  };
  const handleSignInCode = (data) => {
    return AuthClient.post("/sign-in-send-code", data);
  };
  const handleSignUpCode = (data) => {
    return AuthClient.post("/sign-up-send-code", data);
  };
  //напоминание: компонент перерендерится два раза, из-за чего при втором refresh token старый, поэтому повторяем попытку
  useEffect(() => {
    AuthClient.post("/refresh")
    .then((res) =>{
      console.log(refreshAttempted)
      const {accessToken,accessTokenExpiration,outputUser} = res.data;
      inMemoryJWTService.setToken(accessToken, accessTokenExpiration);
      if(outputUser){
        dispatch(setCurrentUserState(outputUser))
      }
      setIsAppReady(true);
      setIsUserLogged(true);
      refreshAttempted = true;
    })
    .catch((e) =>{
      console.log(refreshAttempted)
        if(!refreshAttempted){
          
          setIsAppReady(true);
          dispatch(clearCurrentUserState())
          setIsUserLogged(false);
          console.log(e);
        }
        setIsAppReady(true);
    })
  },[])

  return (
    <AuthContext.Provider
      value={{
        data,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        handleSignUpCode,
        handleSignInCode,
        isUserLogged,
        isAppReady
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div>nothings</div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

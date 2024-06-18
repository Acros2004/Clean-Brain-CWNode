import React, { useContext } from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LogPage from "../pages/Login/LogPage";
import RegPage from "../pages/Registration/RegPage";
import HomePage from "../pages/Home/HomePage";
import PsychologistPage from "../pages/Psychologist/PsychologistPage";
import ProcedurePage from "../pages/Procedure/ProcedurePage";
import ReviewPage from "../pages/Review/ReviewPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import { AuthContext } from "../../context/AuthContext";
import SessionPage from "../pages/Session/SessionPage";
import { useSelector } from "react-redux";

const Navigation = () =>{
    const {isUserLogged} = useContext(AuthContext);
    const user = useSelector(state => state.currentUserSliceMode);
    return(
        <BrowserRouter>
            <Routes>
                {isUserLogged ? (
                    <>
                    <Route path="profile" element={<ProfilePage/>}/>
                    {
                        user.Role_Client !== "Admin" && <Route path="session" element={<SessionPage/>}/>
                    }
                    </>
                ): (
                    <>
                    <Route path="login" element={<LogPage/>}/>
                    <Route path="register" element={<RegPage/>}/>
                    </>
                )}       
                <Route path="home" element={<HomePage/>}/>
                <Route path="psychologist" element={<PsychologistPage/>}/>
                <Route path="procedure" element={<ProcedurePage/>}/>
                <Route path="review" element={<ReviewPage/>}/>
                <Route path="*" element={<Navigate to="home" replace/>}/>  
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;
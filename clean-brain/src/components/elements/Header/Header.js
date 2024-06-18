import React from "react";
import { useEffect } from "react";
import logo from "../../../images/Log.png"
import userIcon from "../../../images/user.png"
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import Popup from "../Popup/Popup";
import BodyProfile from "../Body/BodyProfile/BodyProfile";
import BodyBooking from "../BodyBooking/BodyBooking";
import BodyReviewCreate from "../Body/BodyReviewCreate/BodyReviewCreate";
import { setPopupState } from "../../../states/storeSlice/popupSlice";
import "./Header.css"
import { clearCurrentPsychologistState } from "../../../states/storeSlice/selectedPsychologistSlice";
import { clearCurrentProcedureState } from "../../../states/storeSlice/selectedProcedureSlice";
import io from "socket.io-client"
import config from "../../../config/config";
import showSocketMessage from "../../../utils/showSocketMessage";


const Header = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.currentUserSliceMode);
    const {isUserLogged} = useContext(AuthContext);
    const popup = useSelector(state => state.popupSliceMode);

    useEffect(() => {
        
    }, []);

    const controlPopup = () =>{
        dispatch(setPopupState("None"));
    }
    
    const handleClickProcedure = async () =>{
        await dispatch(clearCurrentPsychologistState())
        await dispatch(clearCurrentProcedureState())
        navigate("/procedure");
    }
    const handleClickPsychologist = async () =>{
        console.log("Список психологов");
        await dispatch(clearCurrentPsychologistState())
        await dispatch(clearCurrentProcedureState())
        navigate("/psychologist");
    }
    
    return(
        <nav className="nav-home">
                <Popup isActive={popup.isActive} closePopup={controlPopup}>
                    {
                        popup.selectedWindow === "Profile" && <BodyProfile/>
                    }
                    {
                        popup.selectedWindow === "Booking" && <BodyBooking ClickBack={controlPopup}/>
                    }
                    {
                        popup.selectedWindow === "Review" && <BodyReviewCreate ClickBack={controlPopup}/>
                    }
                </Popup>
                <Link className="navbar-brand" to="/home">
                    <div className="nav-brand-block" style={{display: "flex", alignItems: "center"}}>
                        <img
                            src = {logo}
                            height="50"
                            alt="MDB Logo"
                            loading="lazy"
                            align="center"
                        />
                        <p className="title" style={{margin: "0 0 0 20px"}}>
                            CLEAN BRAIN
                        </p>
                    </div>
                </Link>
                <div className="nav-elements">
                    <div className="nav-element nav-first">
                        <Link onClick={handleClickPsychologist} className="nav-link">
                            <div className="nav-element-block" style={{display: "flex", alignItems: "center"}}>
                                <p className="nav-element-name">
                                    Психологи
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="nav-element nav-second">
                        <Link onClick={handleClickProcedure} className="nav-link">
                            <div className="nav-element-block" style={{display: "flex", alignItems: "center"}}>
                                <p className="nav-element-name">
                                    Услуги
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="nav-element nav-second">
                        <Link to="/review" className="nav-link">
                            <div className="nav-element-block" style={{display: "flex", alignItems: "center"}}>
                                <p className="nav-element-name">
                                    Отзывы
                                </p>
                            </div>
                        </Link>
                    </div>
                    {
                        user.Role_Client !== "Admin" && isUserLogged && <>
                            <div className="nav-element nav-second">
                                <Link to="/session" className="nav-link">
                                    <div className="nav-element-block" style={{display: "flex", alignItems: "center"}}>
                                        <p className="nav-element-name">
                                            Сеансы
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </>
                    }
                </div>
                {isUserLogged ? (<>
                    
                    <Link className="nav-account" to="/profile">
                    <div className="nav-account-block" style={{display: "flex", alignItems: "center"}}>
                        <p className="profile-name">
                            {user.Name_Client}
                        </p>
                        <img className="nav-account-icon"
                            src = {user.Photo_Client}
                            alt="user"
                            align="center"
                        />
                        
                    </div>
                    </Link>
                    </>
                ) :(
                    <Link to="/register" className="nav-link" >
                    <div className="nav-element-block nav-element-reg" style={{display: "flex", alignItems: "center"}}>
                        <p className="nav-element-name">
                            регистрация
                        </p>
                    </div>
                    </Link>  
                )}
                
        </nav>
    );   
}
export default Header;
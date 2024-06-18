import React, {useContext} from "react";
import { useState } from "react";
import "./BodyProfile.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { useRef } from "react";
import { useEffect } from "react";
import { handleProfileFetchProtected } from "../../../../fetch/ProfileFetch.js";
import { setCurrentUserState } from "../../../../states/storeSlice/currentUserSlice.js";


const BodyProfile = () =>{
    const regexFIO = /^[a-zA-Zа-яА-Я]{1,15}$/;
    const fileInputRef = useRef(null);
    const user = useSelector(state => state.currentUserSliceMode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleLogOut} = useContext(AuthContext);
    const [profileData,setProfileData] = useState({
        profileName: "",
        profileSurname: "",
        profilePhoto: ""
    })

    useEffect(() => {
        async function fetchProfileData() {
            try {
                const photoDataUrl = await urlToDataUrl(user.Photo_Client);
                setProfileData({
                    ...profileData,
                    profileName: user.Name_Client,
                    profileSurname: user.Surname_Client,
                    profilePhoto: photoDataUrl
                });
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        }

        fetchProfileData();
    }, []);

    const [verifyData,setVerifyData] = useState({
        profileName:false,
        profileSurname:false
    })
    const handleLogOutButton = async (e) =>{
        e.preventDefault();
        try{
            await handleLogOut();
        }
        catch(error) {
            console.log(error);
        }
    }


    const handleInputProfileChange = (e) => {
        const { name, value } = e.target;
        if(name === "profileName" || name === "profileSurname"){
            if(regexFIO.test(value))
                setVerifyData({
                    ...verifyData,
                    [name]: false
                })
            else
                setVerifyData({
                    ...verifyData,
                    [name]: true
                })
        }
        setProfileData({
            ...profileData,
            [name]: value
            });
    };

    const handleProfileSubmit = async (e) =>{
        e.preventDefault();
                if(regexFIO.test(profileData.profileName) && regexFIO.test(profileData.profileSurname)){
                    try{
                        handleProfileFetchProtected(profileData).then((res)=>{    
                            dispatch(setCurrentUserState(res.data.newUser))
                        }).catch((error)=>{
                            throw new Error("Профиль не обнавлён");
                        });
                        navigate("/home")
                    }
                    catch(error){
                        console.error(error.message);
                    }
                    
                }
    }

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setProfileData({...profileData, profilePhoto: ev.target.result});
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileSelect = () => fileInputRef.current.click();

    async function urlToDataUrl(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
            return null;
        }
    }
    
    return(
        <div className="container-profile-body">
            <div className="container-profile-wrapper">
                <div className="block-profile">
                    <div className="profile-header">
                            <img className="profile-element-icon"
                                src = {profileData.profilePhoto}
                                alt="user"
                                align="center"
                                onClick={triggerFileSelect}
                            />
                            <input 
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                            ref={fileInputRef}
                            onChange={handleProfileImageChange}
                            style={{ display: 'none' }}
                            />
                    </div>
                    <div className="profile-body">
                        <div className="profile-block-name">
                            <p className="profile-text-name">Ваше имя:</p>
                            <div className="input-box profile-input-block">
                                <input 
                                className={`${verifyData.profileName ? 'warning' : ''}`}
                                type="text"
                                name="profileName"
                                value={profileData.profileName}
                                onChange={handleInputProfileChange} 
                                autoComplete="off" 
                                placeholder="имя" 
                                required/>
                            </div>
                        </div>
                        <div className="profile-block-surname">
                            <p className="profile-text-name">Фамилия:</p>
                            <div className="input-box profile-input-block">
                                <input 
                                className={`${verifyData.profileSurname ? 'warning' : ''}`}
                                type="text"
                                name="profileSurname"
                                value={profileData.profileSurname}
                                onChange={handleInputProfileChange} 
                                autoComplete="off" 
                                placeholder="фамилия" 
                                required/>
                            </div>
                        </div>
                        <div className="profile-block-mail">
                            <p className="profile-text-name">Почта:</p>
                            <div className="input-box profile-input-block">
                                <input 
                                type="text"
                                name="profileMail"
                                value={user.Mail_Client}
                                autoComplete="off" 
                                placeholder={user.Mail_Client}
                                readOnly
                                required/>
                            </div>
                        </div>
                        <div className="profile-block-botton">
                            <button className="profile-botton" type="button" onClick={handleProfileSubmit}>Сохранить</button>
                            <div className="profile-block-logout">
                            <button onClick={handleLogOutButton} className="profile-logout">Выход</button>
                            </div>                    
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );   
}
export default BodyProfile;
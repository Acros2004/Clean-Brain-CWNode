import React from "react";
import Header from "../../elements/Header/Header";
import Footer from "../../elements/Footer/Footer";
import BodyProfile from "../../elements/Body/BodyProfile/BodyProfile";
import '../Home/HomePage.css'

const ProfilePage = () =>{
        return(         
            <div className="container-page">
                <Header/>
                <BodyProfile/>
                <Footer/>
            </div>
    )
}

export default ProfilePage;
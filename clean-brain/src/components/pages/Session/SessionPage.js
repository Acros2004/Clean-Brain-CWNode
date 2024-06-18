import React from "react";
import Header from "../../elements/Header/Header";
import Footer from "../../elements/Footer/Footer";
import '../Home/HomePage.css'
import BodySession from "../../elements/Body/BodySession/BodySession";

const SessionPage = () => {

        return(         
            <div className="container-page">
                <Header/>
                <BodySession/>
                <Footer/>
            </div>
    )
}

export default SessionPage;
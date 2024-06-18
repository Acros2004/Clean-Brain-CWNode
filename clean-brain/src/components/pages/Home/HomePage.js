import React from "react";
import Header from "../../elements/Header/Header";
import Footer from "../../elements/Footer/Footer";
import BodyHome from "../../elements/Body/BodyHome/BodyHome";
import BodyList from "../../elements/Body/BodyPsychologistList/BodyPsychologist";
import BodyProfile from "../../elements/Body/BodyProfile/BodyProfile";
import './HomePage.css'



class HomePage extends React.Component {
    render(){
        return(         
            <div className="container-page">
                <Header/>
                <BodyHome/>
                <Footer/>
            </div>
    )}
}

export default HomePage;
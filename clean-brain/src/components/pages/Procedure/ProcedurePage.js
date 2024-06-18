import React from "react";
import Header from "../../elements/Header/Header";
import Footer from "../../elements/Footer/Footer";
import BodyProcedure from "../../elements/Body/BodyProcedureList/BodyProcedure";
import { useState } from "react";
import BodyProcedureProfile from "../../elements/Body/BodyProcedureProfile/BodyProcedureProfile";
import '../Home/HomePage.css'
import UpdateBodyProcedureProfile from "../../elements/Body/BodyProcedureProfile/UpdateBodyProcedureProfile";

const ProcedurePage = () => {

    const [isOpenProfile,setIsOpenProfile] = useState(false);
    const [selectedProfile,setSelectedProfile] = useState("");

    const controlProfile = (procedure) => {
        try{
            if(procedure.Id_Procedure) setSelectedProfile(procedure)
            else setSelectedProfile("")
            setIsOpenProfile(!isOpenProfile);
        }
        catch(error){
            setSelectedProfile("");
            setIsOpenProfile(false);
        }
        
    };
    let content;
    if (isOpenProfile) {
        content = selectedProfile ? (
            <UpdateBodyProcedureProfile
                onClickBack={controlProfile}
                procedure={selectedProfile}
            />
        ) : (
            
            <BodyProcedureProfile onClickBack={controlProfile} />
        );
    } else {
        content = <BodyProcedure onSelect={controlProfile} />;
    }

        return(         
            <div className="container-page">
                <Header/>
                {content}
                <Footer/>
            </div>
    )
}

export default ProcedurePage;
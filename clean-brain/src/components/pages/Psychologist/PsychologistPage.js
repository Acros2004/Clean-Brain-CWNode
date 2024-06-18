import React,{useState, useCallback, useEffect} from "react";
import Header from "../../elements/Header/Header";
import Footer from "../../elements/Footer/Footer";
import BodyPsychologist from "../../elements/Body/BodyPsychologistList/BodyPsychologist";
import BodyPsychologistProfile from "../../elements/Body/BodyPsychologistProfile/BodyPsychologistProfile";
import UpdateBodyPsychologistProfile from "../../elements/Body/BodyPsychologistProfile/UpdateBodyPsychologistProfile";
import '../Home/HomePage.css'

const PsychologistPage = () =>{
    const [isOpenProfile,setIsOpenProfile] = useState(false);
    const [selectedProfile,setSelectedProfile] = useState("");

    const controlProfile = (psychologist) => {
        try{
            if(psychologist.Id_Psychologist) setSelectedProfile(psychologist)
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
            <UpdateBodyPsychologistProfile
                onClickBack={controlProfile}
                psychologist={selectedProfile}
            />
        ) : (
            
            <BodyPsychologistProfile onClickBack={controlProfile} />
        );
    } else {
        content = <BodyPsychologist onSelect={controlProfile} />;
    }

        return(         
            <div className="container-page">
                <Header/>
                {content}
                <Footer/>
            </div>
    )
}

export default PsychologistPage;
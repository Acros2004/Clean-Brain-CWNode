import React from "react";
import "./CardPsychologist.css"
import userIcon from "../../../../images/example.jpg"

const CardPsychologist = ({handleRedirectToProcedure,psychologist,onSelect}) =>{
    const getFullName = () =>{
        return `${psychologist.Surname_Psychologist} ${psychologist.Name_Psychologist} ${psychologist.Patronymic_Psychologist}`;
    }
    const conrtolSelect = (event) => {
        event.stopPropagation();  // Остановка всплывания события
        onSelect(psychologist);
    };
    const conrtolRedirect = ()=>{
        handleRedirectToProcedure(psychologist);
    }
    return(
        <div className="psychologist-body-element" onClick={conrtolRedirect}>
                    <div className="body-element-header-block">
                        <p className="body-element-header-title">{getFullName()}</p>
                    </div>
                    <div className="body-element-main-block">
                        <p className="body-element-main-text">{psychologist.Description}</p>
                    </div>
                    <img className="body-element-icon"
                            src = {psychologist.Photo_Psychologist}
                            alt="user"
                            loading="lazy"
                            align="center"
                            onClick={conrtolSelect}
                    />
        </div>
    );   
}
export default CardPsychologist;
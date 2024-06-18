import React from "react";
import "./CardProcedure.css"

const CardProcedure = ({handleRedirectToPsychologistOrBooking,procedure,onSelect}) =>{
    const conrtolSelect = (event)=>{
        event.stopPropagation();
        onSelect(procedure);
    }
    const conrtolRedirect = ()=>{
        handleRedirectToPsychologistOrBooking(procedure);
    }

    return(
        <div className="procedure-body-element" onClick={conrtolRedirect}>
                    <div className="body-procedure-element-header-block">
                        <p className="body-procedure-element-header-title">{procedure.Name_Procedure}</p>
                    </div>
                    <div className="body-procedure-element-main-block">
                        <p className="body-procedure-element-main-text">{procedure.Depiction}</p>
                    </div>
                    <div className="body-procedure-element-price">
                        <p className="body-procedure-element-price-text">Цена: {procedure.Price}</p>
                    </div>
                    <img className="body-procedure-element-icon"
                            src={procedure.Photo_Procedure}                   
                            alt="user"
                            loading="lazy"
                            align="center"
                            onClick={conrtolSelect}
                    />
                    
        </div>
    );   
}
export default CardProcedure;
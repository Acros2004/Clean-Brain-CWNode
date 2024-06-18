import {React, useEffect} from "react";
import "./Popup.css"


const Popup = ({isActive, closePopup, children}) =>{

    useEffect(() => {
        const handleScroll = (event) => {
          if (isActive) {
            event.preventDefault();
            event.stopPropagation();
          }
        };
        if (isActive) {
          document.body.style.overflow = "hidden";
          document.body.addEventListener("scroll", handleScroll, {
            passive: false,
          });
        } else {
          document.body.style.overflow = "";
          document.body.removeEventListener("scroll", handleScroll);
        }
        return () => {
          document.body.style.overflow = "";
          document.body.removeEventListener("scroll", handleScroll);
        };
    }, [isActive]);

    const controlPopup = ()=>{
        closePopup("");
    }

    return(
            <div className="popup-wrapper" style={
                    {
                        display: isActive ? 'flex' : 'none',
                        backgroundColor: isActive ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)',
                        pointerEvents: isActive ? 'all' : 'none',
                    }
                } 
                onClick={controlPopup}>
                    <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                
            </div>
    );   
}
export default Popup;
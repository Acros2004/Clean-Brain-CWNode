import {React, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import CardProcedure from "../../Cards/CardProcedure/CardProcedure";
import "../BodyPsychologistList/BodyPsychologist.css"
import "./BodySession.css"

import { useDispatch, useSelector } from "react-redux";
import CardSession from "../../Cards/CardSession/CardSession";
import { getAllBookings } from "../../../../states/storeSlice/listBookingSlice";

const BodySession = ({onSelect}) =>{

    const dispatch = useDispatch();
    const {status, error,bookings} = useSelector(state => state.listBookingSliceMode)
    const user = useSelector(state => state.currentUserSliceMode);


    useEffect(() => {        
        dispatch(getAllBookings());
    }, [])    

    

    return(
        <div className="container-list-body">
            <div className="container-list-wrapper">
                <div className="title-list-body-block">
                        <p className="title-list-body">
                            Ваши сеансы
                        </p>
                </div>
                
                <div className="session-list">
                    { status === 'loading' && <p>Загрузка...</p> }
                    { status === 'rejected' && <p>Возникла ошибка: {error}</p>}
                    { status === 'fulfilled' && bookings && bookings.map((booking) => <CardSession booking={booking}/>)}
                </div>     
            </div>
        </div>
    );   
}
export default BodySession;
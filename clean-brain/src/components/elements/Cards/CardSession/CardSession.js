import React, { useState } from "react";
import "./CardSession.css"
import CloseBotton from "../../../../images/closeBottonBlack.png"
import StaticClass from "../../../../static/StaticClass";
import { handleDeleteBookingFetchProtected } from "../../../../fetch/ProfileFetch";
import { useDispatch } from "react-redux";
import { getAllBookings } from "../../../../states/storeSlice/listBookingSlice";

const CardSession = ({booking}) =>{
    const dispatch = useDispatch();
    const [correctBooking, setCorrectBooking] = useState({
        Name_Procedure: booking.Procedures.Name_Procedure,
        Psychologist_FIO: `${booking.Voucher.Psychologist.Surname_Psychologist} ${booking.Voucher.Psychologist.Name_Psychologist}`,
        Voucher: StaticClass.getCorrectVoucher(booking.Voucher)

    })

    const handleBookingDelete = async (e) =>{
        e.preventDefault();
        try{
            await handleDeleteBookingFetchProtected(booking.ID_Booking)
            dispatch(getAllBookings());
        }
        catch(error){
            console.error(error.message)
        }
    }

    return(
        <div className="session-body-element" >
            <img 
                onClick={handleBookingDelete}
                src={CloseBotton}
                className="session-close-element"
            />
            <div className="session-header-block-element">
                <p className="session-header-element">{correctBooking.Name_Procedure}</p>
            </div>
            <div className="session-body-element">
                <p className="session-fio-element">{correctBooking.Psychologist_FIO}</p>
                <p className="session-date-element">{`${correctBooking.Voucher.Date_Voucher}`}</p>
                <p className="session-time-element">{`${correctBooking.Voucher.Time_Voucher_Start}-${correctBooking.Voucher.Time_Voucher_End}`}</p>
            </div>
                    
        </div>
    );   
}
export default CardSession;
import {React, useEffect, useState} from "react";
import Select from "../Select/Select";
import './BodyBooking.css'
import { getPsychologistsFetch } from "../../../fetch/PsychologistFetch";
import { useDispatch, useSelector } from "react-redux";
import { getProcedureFetch } from "../../../fetch/ProcedureFetch";
import StaticClass from "../../../static/StaticClass";
import { handleBookingFetchProtected } from "../../../fetch/ProfileFetch";
import { clearCurrentProcedureState } from "../../../states/storeSlice/selectedProcedureSlice";
import { clearCurrentPsychologistState } from "../../../states/storeSlice/selectedPsychologistSlice";
import { useNavigate } from "react-router-dom";

const BodyBooking = ({ClickBack}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [psychologist,setPsychologist] = useState("");
    const [procedure, setProcedure] = useState("");
    const [selectedDate,setSelectedDate] = useState("Выберите");
    const [dateArray, setDateArray] = useState([]);
    const [selectedTime,setSelectedTime] = useState("Выберите");
    const [timeArray, setTimeArray] = useState([]);
    const [errorMessage,setErrorMessage] = useState("");
    const selectedPsychologist = useSelector(state => state.selectedPsychologistSliceMode.psychologist)
    const selectedProcedure = useSelector(state => state.selectedProcedureSliceMode.procedure)
    useEffect(() => {
        const fetchData = async () => {
            try{
                if(selectedProcedure && selectedPsychologist){
                    await getPsychologistsFetch(selectedPsychologist.Id_Psychologist).then((res)=>{
                        setPsychologist(StaticClass.getCorrectPsychologistDateAndTime(res.data.psychologist));
                    });
                    await getProcedureFetch(selectedProcedure.Id_Procedure).then((res)=>{
                        setProcedure(res.data.procedure);
                    })
                }        
            }
            catch(error){
                console.error(error)
            }         
        };
        fetchData();
    }, [selectedProcedure,selectedPsychologist]);
    useEffect(() => {
        if (psychologist) {
            const uniqueDates = psychologist.Voucher.reduce((unique, voucher) => {
                const voucherDate = voucher.Date_Voucher;
                if (!unique.includes(voucherDate)) {
                    unique.push(voucherDate);
                }
                return unique;
            }, []);
            setDateArray(uniqueDates);
        }
    }, [psychologist]);

    useEffect(() => {
        if(selectedDate !== "Выберите"){
            setSelectedTime("Выберите");
            getTimeVoucherStartsForDate();
        }
        
    }, [selectedDate]);

    


    const getTimeVoucherStartsForDate = () => {
        const filteredVouchers = psychologist.Voucher.filter(voucher => voucher.Date_Voucher === selectedDate);
        setTimeArray(filteredVouchers.map(voucher => voucher.Time_Voucher_Start));
    }

    const handleBookingSubmit = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        try{
            if(psychologist.Id_Psychologist && procedure.Id_Procedure &&
                selectedDate !== "Выберите" && selectedTime !== "Выберите"){
                    const findVoucher = psychologist.Voucher.find(voucher => voucher.Time_Voucher_Start === selectedTime && voucher.Date_Voucher === selectedDate);
                    if(findVoucher !== undefined){
                        await handleBookingFetchProtected({Id_Procedure: procedure.Id_Procedure, Id_Voucher: findVoucher.Id_Voucher}).then(res =>{
                            dispatch(clearCurrentProcedureState());
                            dispatch(clearCurrentPsychologistState());
                            ClickBack();
                            navigate("/home");
                            
                        })
                    }
                }
        }
        catch(error){
            if(error.response)
                setErrorMessage( error.response.data.error)
            else
                setErrorMessage( error.message)
        }
    }
    

        return(         
            <div className="booking-wrapper">
                <div className="booking-container">
                    <p className="booking-title">Оформление</p>
                    <p className="booking-procedure-title">Название услуги</p>
                    <p className="booking-procedure-name">{procedure.Name_Procedure}</p>
                    <p className="booking-psychologist-title">ФИО психолога</p>
                    <p className="booking-procedure-name">{StaticClass.getFullNamePsychologist(psychologist.Surname_Psychologist,psychologist.Name_Psychologist,psychologist.Patronymic_Psychologist)}</p>
                    <p className="booking-date-title">Выберите дату</p>
                    <div className="booking-date-select">
                        <Select
                            data={dateArray} 
                            selectedItem={selectedDate} 
                            onSelect={setSelectedDate}
                        />
                    </div>
                    <p className="booking-date-title">Выберите время</p>
                    <div className="booking-date-select">
                        <Select
                            data={timeArray} 
                            selectedItem={selectedTime} 
                            onSelect={setSelectedTime}
                        />
                    </div>
                    <div className="booking-create-block">
                    <button className="booking-create-botton" type="button" onClick={handleBookingSubmit}>Создать</button>
                    </div>
                </div>
            </div>
    )
}

export default BodyBooking;
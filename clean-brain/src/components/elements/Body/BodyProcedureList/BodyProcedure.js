import {React, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import CardProcedure from "../../Cards/CardProcedure/CardProcedure";
import "../BodyPsychologistList/BodyPsychologist.css"
import "./BodyProcedure.css"
import Select from "../../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { getAllProcedures } from "../../../../states/storeSlice/listProceduresSlice";
import { getAllSpecializationFetch } from "../../../../fetch/OtherFetch";
import { setSpecializationState } from "../../../../states/storeSlice/listSpecializationSlice";
import StaticClass from "../../../../static/StaticClass";
import { clearCurrentPsychologistState } from "../../../../states/storeSlice/selectedPsychologistSlice";
import { clearCurrentProcedureState, setCurrentProcedureState } from "../../../../states/storeSlice/selectedProcedureSlice";
import { setPopupState } from "../../../../states/storeSlice/popupSlice";

const BodyProcedure = ({onSelect}) =>{

    const psychologist = useSelector(state => state.selectedPsychologistSliceMode.psychologist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error,procedures} = useSelector(state => state.listProceduresSliceMode)
    const user = useSelector(state => state.currentUserSliceMode);

    const getAllPsychologistProcedure = () =>{
        return procedures.filter(procedure =>{
            return StaticClass.getArraySpecializationsPsychologist(psychologist.CollectionSpezialization).includes(procedure.Spezialization_Procedure)
        });
    }

    const allProcedureProvidingPsychologist = psychologist ? getAllPsychologistProcedure() : [];
    const [filteredProcedures, setFilteredProcedures] = useState([]);
    
    const fetchData = async ()=>{
        try{
            await getAllSpecializationFetch().then((res) =>{
                dispatch(setSpecializationState(res.data.allSpecializations))
            })
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(clearCurrentProcedureState());
        dispatch(getAllProcedures())
        fetchData();
    }, [psychologist])

    useEffect(() => {
        if (status === 'fulfilled') {
            setFilteredProcedures(psychologist ? allProcedureProvidingPsychologist : procedures);
        }
    }, [status]);


    const specializationState = useSelector(state => state.listSpecializationMode);
    const [selectedSpecification, setSelectedSpecification] = useState("Выберите");
    const hadleSpecification = (specification) =>{
        if(selectedSpecification === specification)
            setSelectedSpecification("Выберите")
        else    
            setSelectedSpecification(specification)
    }
    const [inputProcedure,setInputProcedure] = useState({
        searchPrcodure: "",
        searchPrice: ""
    });

    const handleInputSearch = (e) =>{
        const {name, value} = e.target;
        if(name === "searchPrice"){
            if(StaticClass.regexNumberSearch.test(value) || value === "")
                setInputProcedure({...inputProcedure,
                [name]: value});
        }      
        else
            setInputProcedure({...inputProcedure,
                [name]: value});
    }

    const searchFiltered = () => {
        const checkArrayProcedures = psychologist ? allProcedureProvidingPsychologist : procedures;
        setFilteredProcedures(
            checkArrayProcedures.filter(procedure => {
                const isNameMatch = procedure.Name_Procedure.toLowerCase().includes(inputProcedure.searchPrcodure.toLowerCase());
                const isPriceMatch = inputProcedure.searchPrice === "" || procedure.Price <= parseFloat(inputProcedure.searchPrice);
                const isSpecializationMatch = selectedSpecification === "Выберите" || procedure.Spezialization_Procedure.toLowerCase().includes(selectedSpecification.toLowerCase());
    
                return isNameMatch && isPriceMatch && isSpecializationMatch;
            })
        );
    };
    const handleRedirectToPsychologistOrBooking = async (procedure) =>{
        if(user.Role_Client === "Client"){
            if(procedure && psychologist){
                await dispatch(setCurrentProcedureState(procedure));
                await dispatch(setPopupState("Booking"))
            }
            else if (procedure){
                await dispatch(setCurrentProcedureState(procedure));
                navigate('/psychologist'); 
            }
        }      
    }

    useEffect(() => {
        if (status === 'fulfilled') {
            searchFiltered();
        }
    }, [status]);
    /////
    useEffect(() => {
        searchFiltered();
    }, [inputProcedure,selectedSpecification]);
    /////
    
    return(
        <div className="container-list-body">
            <div className="container-list-wrapper">
                <div className="title-list-body-block">
                        <p className="title-list-body">
                            Услуги
                        </p>
                        <div className="input-box procedure-search-block">
                                <input 
                                type="text"
                                name="searchPrcodure"
                                value={inputProcedure.searchPrcodure}
                                onChange={handleInputSearch} 
                                autoComplete="off" 
                                placeholder="Название" 
                                required/>
                        </div>
                        <div className="input-box procedure-search-price-block">
                                <input 
                                type="text"
                                name="searchPrice"
                                value={inputProcedure.searchPrice}
                                onChange={handleInputSearch} 
                                autoComplete="off" 
                                placeholder="Цена(до):" 
                                required/>
                        </div>
                        <div className="procedure-serch-specialization">
                            <Select
                                data={specializationState.Spezialization_Name} 
                                selectedItem={selectedSpecification} 
                                onSelect={hadleSpecification}
                            />
                        </div>
                        { user.Role_Client === "Admin" && <button className="create-psychologist-list" onClick={onSelect} type="button">Создать</button> }
                </div>
                { status === 'loading' && <p>Загрузка...</p> }
                { status === 'rejected' && <p>Возникла ошибка: {error}</p>}
                { status === 'fulfilled' && filteredProcedures && filteredProcedures.map((procedure) => <CardProcedure handleRedirectToPsychologistOrBooking={handleRedirectToPsychologistOrBooking} onSelect={onSelect} procedure = {procedure} />)}
            </div>
        </div>
    );   
}
export default BodyProcedure;
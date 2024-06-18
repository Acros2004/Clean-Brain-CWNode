import React from "react";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import MultiplySelect from "../../MultiplySelect/MultiplySelect";
import CardPsychologist from "../../Cards/CardPsychologist/CardPsychologist";
import { useDispatch, useSelector } from "react-redux";
import { getAllPsychologists } from "../../../../states/storeSlice/listPsychologistsSlice";
import { setPopupState } from "../../../../states/storeSlice/popupSlice";
import "./BodyPsychologist.css"
import { getAllSpecializationFetch } from "../../../../fetch/OtherFetch";
import { setSpecializationState } from "../../../../states/storeSlice/listSpecializationSlice";
import StaticClass from "../../../../static/StaticClass";
import { clearCurrentPsychologistState, setCurrentPsychologistState } from "../../../../states/storeSlice/selectedPsychologistSlice";

const BodyPsychologist = ({onSelect}) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const procedure = useSelector(state => state.selectedProcedureSliceMode.procedure);
    const {status, error,psychologists} = useSelector(state => state.listPsychologistsSliceMode)
    const user = useSelector(state => state.currentUserSliceMode);
    const [inputPsychologist,setInputPsychologist] = useState("");
    
    const handleInputSearch = (e) =>{
        setInputPsychologist(e.target.value)
    }

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
        console.log("Рендер психологов")
        
        dispatch(getAllPsychologists())
        dispatch(clearCurrentPsychologistState());
        fetchData();
    }, [procedure])



    useEffect(() => {
        if (status === 'fulfilled') {
            setFilteredPsychologists(psychologists);
        }
    }, [status]);

    const handleRedirectToProcedureOrBooking = async (psychologist) =>{
        if(user.Role_Client === "Client"){
            if(procedure && psychologist){
                await dispatch(setCurrentPsychologistState(psychologist));
                await dispatch(setPopupState("Booking"))
            }
            else if (psychologist){
                await dispatch(setCurrentPsychologistState(psychologist));
                navigate('/procedure');
            }
        }   
    }


    const specializationState = useSelector(state => state.listSpecializationMode);
    const [selectedSpecification, setSelectedSpecification] = useState([]);
    const handleSelectSpecification = (item) => {
        const index = selectedSpecification.indexOf(item);
        if (index !== -1) {
            setSelectedSpecification(selectedSpecification.filter((_, i) => i !== index));
        } else {
            setSelectedSpecification([...selectedSpecification, item]);
        }
    };

    const getAllPsychologistProcedure = () =>{
        return psychologists.filter(psychologist =>{
            return StaticClass.getArraySpecializationsPsychologist(psychologist.CollectionSpezialization).includes(procedure.Spezialization_Procedure)
        });
    }

    const allPsychologistsProvidingProcedure = procedure ? getAllPsychologistProcedure() : [];
    const [filteredPsychologists, setFilteredPsychologists] = useState([]);
    
    const searchFiltered = () =>{
        const checkArrayPsychologist = procedure ? allPsychologistsProvidingProcedure : psychologists
        setFilteredPsychologists(
            checkArrayPsychologist.filter(psycho => {
            return StaticClass.getFullNamePsychologist(psycho.Surname_Psychologist,psycho.Name_Psychologist,psycho.Patronymic_Psychologist).toLowerCase().includes(inputPsychologist.toLowerCase()) &&
                   (selectedSpecification.length === 0 || selectedSpecification.every(serchedSpecilization => StaticClass.getArraySpecializationsPsychologist(psycho.CollectionSpezialization).includes(serchedSpecilization)));
        }));
    }

    useEffect(() => {
        if (status === 'fulfilled') {
            setFilteredPsychologists(procedure ? allPsychologistsProvidingProcedure : psychologists);
        }
    }, [status]);
    
    useEffect(() => {
        if (status === 'fulfilled') {
            searchFiltered();
        }
    }, [status]);

    /////
    useEffect(() => {
        searchFiltered();
    }, [inputPsychologist,selectedSpecification]);
    /////

    return(
        <div className="container-list-body">
            <div className="container-list-wrapper">
                <div className="title-list-body-block">
                        <p className="title-list-body">
                            Психологи
                        </p>
                        <div className="input-box psychologist-search-block">
                                <input 
                                type="text"
                                name="searchFIO"
                                value={inputPsychologist}
                                onChange={handleInputSearch} 
                                autoComplete="off" 
                                placeholder="Введите ФИО" 
                                required/>
                        </div>
                        <div className="psychologist-serch-specialization">
                            <MultiplySelect
                                data={specializationState.Spezialization_Name}
                                selectedItems={selectedSpecification}
                                onSelect={handleSelectSpecification}
                            />
                        </div>
                        { user.Role_Client === "Admin" && <button className="create-psychologist-list" onClick={onSelect} type="button">Создать</button> }
                        
                </div>
                { status === 'loading' && <p>Загрузка...</p> }
                { status === 'rejected' && <p>Возникла ошибка: {error}</p>}
                { status === 'fulfilled' && filteredPsychologists && filteredPsychologists.map((psychologist) => <CardPsychologist handleRedirectToProcedure={handleRedirectToProcedureOrBooking} onSelect={onSelect} psychologist = {psychologist} />)}
                
            </div>
        </div>
    );   
}
export default BodyPsychologist;
import {React, useEffect, useState} from "react";
import { useRef } from "react";
import "./BodyProcedureProfile.css"
import backArrow from "../../../../images/backArrow.svg"
import procedureIcon from "../../../../images/Ругня.jpg"
import Select from "../../Select/Select";
import { handleCreateProcedureFetchProtected } from "../../../../fetch/AdminFetch";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecializationFetch } from "../../../../fetch/OtherFetch";
import { setSpecializationState } from "../../../../states/storeSlice/listSpecializationSlice";
import StaticClass from "../../../../static/StaticClass";


const BodyProcedureProfile = ({onClickBack}) =>{
    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUserSliceMode);
    const [procedureData, setProcedureData] = useState({
        Name_Procedure:"",
        Price:"",
        Depiction:"",
        Spezialization_Procedure:"",
        Photo_Procedure:""
    });

    const [verifyProcedureData,setVerifyProcedureData] = useState({
        Name_Procedure: true,
        Price: true,
        Depiction: true
    })

    useEffect(() =>{
        const fetchData = async () => {
            try{
                await getAllSpecializationFetch().then((res)=>{
                    dispatch(setSpecializationState(res.data.allSpecializations))
                })
            }
            catch(error){
                console.error(error)
            }         
        };
        const fetchImageDefault = async() => {
            try {
                const response = await fetch(procedureIcon);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => setProcedureData({
                    ...procedureData,
                    Photo_Procedure:reader.result
                    });
                reader.onerror = error => console.error('Ошибка чтения данных: ', error);
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Ошибка загрузки изображения: ', error);
            }
        }
        fetchData();
        fetchImageDefault();
    }, []);

    const specializationState = useSelector(state => state.listSpecializationMode);
    const [selectedSpecification, setSelectedSpecification] = useState("Выберите");

    const handleInputProcedureProfileChange = (e) => {
        const { name, value } = e.target;
        if (name === "Price"){
            if(StaticClass.regexPrice.test(value))
                setVerifyProcedureData({...verifyProcedureData,
                    [name]: false})
            else
                setVerifyProcedureData({...verifyProcedureData,
                    [name]: true})
        } else if (name === "Name_Procedure"){
            if(StaticClass.regexNameProcedure.test(value))
                setVerifyProcedureData({...verifyProcedureData,
                    [name]: false})
            else
                setVerifyProcedureData({...verifyProcedureData,
                    [name]: true})
        } else {
            if(StaticClass.regexDepiction.test(value))
                setVerifyProcedureData({...verifyProcedureData,
                    [name]: false})
            else
                setVerifyProcedureData({...verifyProcedureData,
                    [name]: true})
        }
        
        setProcedureData({...procedureData,
            [name]: value});    
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setProcedureData({...procedureData, Photo_Procedure: ev.target.result});
            };
            reader.readAsDataURL(file);
        }
    };
    const fileInputImageRef = useRef(null);
    const triggerFileSelect = () => fileInputImageRef.current.click();

    const [errorMessage,setErrorMessage] = useState("");

    const handleProcedureProfileSubmit = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        try{
            if(verifyProcedureData.Name_Procedure === false && verifyProcedureData.Depiction === false &&
                verifyProcedureData.Price === false){
                    if(selectedSpecification !== "Выберите"){
                        const data = procedureData;
                        data.Spezialization_Procedure = selectedSpecification;

                        await handleCreateProcedureFetchProtected(data).then((res)=>{
                            onClickBack();
                        })
                    }
                    else
                        throw new Error("Не выбрано направление")
                }
        } catch(error){
            if(error.response)
                setErrorMessage( error.response.data.error)
            else
            setErrorMessage( error.message)
        }
        
    }

        return(
            <div className="container-procedure-profile-body">
                <div className="container-procedure-profile-wrapper">
                    <div className="block-procedure-profile">
                        <img className="back-arrow-procedure-profile"
                            src={backArrow}
                            onClick={onClickBack}
                        />
                        <div className="left-side-procedure-profile">
                            <img className="image-procedure-profile"
                                src = {procedureData.Photo_Procedure}
                                alt="procedure"
                                onClick={triggerFileSelect}
                            />
                            <input 
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                            ref={fileInputImageRef}
                            onChange={handleProfileImageChange}
                            style={{ display: 'none' }}
                            />
                            <p className="specification-procedure-profile">Направление</p>
                            <Select
                                data = {specializationState.Spezialization_Name}
                                selectedItem={selectedSpecification}
                                onSelect={setSelectedSpecification}
                            />
                            <p className="procedure-price-profile">Цена(руб):</p>
                            <div className="input-box procedure-price-input-block">
                                <input 
                                className={`${verifyProcedureData.Price ? 'warning-procedure' : ''}`}
                                type="text"
                                name="Price"
                                onChange={handleInputProcedureProfileChange} 
                                autoComplete="off" 
                                placeholder="стоимость" 
                                required/>
                            </div>
                        </div>
                        <div className="right-side-procedure-profile">
                            <div className="titel-procedure-profile-block">
                                <p className="titel-procedure-profile">Услуга:</p>
                                <div className="input-box titel-procedure-input-block">
                                    <input 
                                    className={`${verifyProcedureData.Name_Procedure ? 'warning-procedure' : ''}`}
                                    type="text"
                                    name="Name_Procedure"
                                    onChange={handleInputProcedureProfileChange} 
                                    autoComplete="off" 
                                    placeholder="название" 
                                    required/>
                                </div>
                            </div>
                            <div className="description-block-body-procedure-profile">
                                <p className="description-header-procedure-profile">Описание</p>
                                    <textarea name="Depiction" 
                                        className={`${verifyProcedureData.Depiction ? 'warning-procedure description-area-procedure-profile' : 'description-area-procedure-profile'}`}
                                        onChange={handleInputProcedureProfileChange}
                                        placeholder="Напишите описание"></textarea>
                            </div>
                            <div className="error-mesage-procedure-profile">
                                {errorMessage}
                            </div>

                            {
                                user.Role_Client === "Admin" ?
                                <div className="botton-block-procedure-profile">
                                    <button className="create-botton-procedure-profile" onClick={handleProcedureProfileSubmit} type="button">Создать</button>
                                </div>:
                                <></>
                            }       

                        </div>  
                    </div>  
                </div>
            </div>
        );  
}
export default BodyProcedureProfile;
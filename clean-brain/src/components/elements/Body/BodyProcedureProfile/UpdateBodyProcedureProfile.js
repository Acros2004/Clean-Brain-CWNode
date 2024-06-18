import {React, useEffect, useState} from "react";
import { useRef } from "react";
import "./BodyProcedureProfile.css"
import backArrow from "../../../../images/backArrow.svg"
import Select from "../../Select/Select";
import { handleDeleteProcedureFetchProtected, handleUpdateProcedureFetchProtected } from "../../../../fetch/AdminFetch";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecializationFetch } from "../../../../fetch/OtherFetch";
import { setSpecializationState } from "../../../../states/storeSlice/listSpecializationSlice";
import StaticClass from "../../../../static/StaticClass";


const UpdateBodyProcedureProfile = ({onClickBack, procedure}) =>{
    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUserSliceMode);
    const [procedureData, setProcedureData] = useState({
        Id_Procedure: procedure.Id_Procedure,
        Name_Procedure: procedure.Name_Procedure,
        Price: procedure.Price,
        Depiction: procedure.Depiction,
        Spezialization_Procedure: procedure.Spezialization_Procedure,
        Photo_Procedure: ""
    });

    const [verifyProcedureData,setVerifyProcedureData] = useState({
        Name_Procedure: false,
        Price: false,
        Depiction: false
    })

    useEffect(() => {
        
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
        async function fetchImage() {
            try {
                const photoDataUrl = await urlToDataUrl(procedure.Photo_Procedure);
                setProcedureData({
                    ...procedureData,
                    Photo_Procedure: photoDataUrl
                });
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        }
        fetchData();
        fetchImage();
    }, []);

    async function urlToDataUrl(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
            return null;
        }
    }

    const specializationState = useSelector(state => state.listSpecializationMode);
    const [selectedSpecification, setSelectedSpecification] = useState(procedure.Spezialization_Procedure);

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

    const handleProcedureProfileDelete = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        try{
            await handleDeleteProcedureFetchProtected(procedureData.Id_Procedure)
            onClickBack();
        }
        catch(error){
            setErrorMessage(error.message)
        }
    }

    const handleProcedureProfileSubmit = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        try{
            if(verifyProcedureData.Name_Procedure === false && verifyProcedureData.Depiction === false &&
                verifyProcedureData.Price === false){
                    if(selectedSpecification !== "Выберите"){
                        const data = procedureData;
                        data.Spezialization_Procedure = selectedSpecification;

                        await handleUpdateProcedureFetchProtected(data).then((res)=>{
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
                                onClick={user.Role_Client !== "Admin" ? null : triggerFileSelect}
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
                                data = {user.Role_Client !== "Admin" ? [] : specializationState.Spezialization_Name}
                                selectedItem={selectedSpecification}
                                onSelect={setSelectedSpecification}
                            />
                            <p className="procedure-price-profile">Цена(руб):</p>
                            <div className="input-box procedure-price-input-block">
                                <input 
                                className={`${verifyProcedureData.Price ? 'warning-procedure' : ''}`}
                                value={procedureData.Price}
                                type="text"
                                name="Price"
                                readOnly={user.Role_Client !== "Admin"}
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
                                    value={procedureData.Name_Procedure}
                                    name="Name_Procedure"
                                    onChange={handleInputProcedureProfileChange} 
                                    autoComplete="off" 
                                    readOnly={user.Role_Client !== "Admin"}
                                    placeholder="название" 
                                    required/>
                                </div>
                            </div>
                            <div className="description-block-body-procedure-profile">
                                <p className="description-header-procedure-profile">Описание</p>
                                    <textarea name="Depiction" value={procedureData.Depiction} 
                                        className={`${verifyProcedureData.Depiction ? 'warning-procedure description-area-procedure-profile' : 'description-area-procedure-profile'}`}
                                        onChange={handleInputProcedureProfileChange}
                                        readOnly={user.Role_Client !== "Admin"}
                                        placeholder="Напишите описание"></textarea>
                            </div>
                            <div className="error-mesage-procedure-profile">
                                {errorMessage}
                            </div>

                            {
                                user.Role_Client === "Admin" ?
                                <div className="botton-block-procedure-profile">
                                    <button className="save-botton-procedure-profile" onClick={handleProcedureProfileSubmit} type="button">Изменить</button>
                                    <button className="delete-botton-procedure-profile" onClick={handleProcedureProfileDelete} type="button">Удалить</button>
                                </div>:
                                <></>
                            }       

                        </div>  
                    </div>  
                </div>
            </div>
        );  
}
export default UpdateBodyProcedureProfile;
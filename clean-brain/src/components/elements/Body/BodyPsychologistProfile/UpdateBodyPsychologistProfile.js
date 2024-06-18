import React, { useState, useEffect} from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import backArrow from "../../../../images/backArrow.svg"
import userIcon from "../../../../images/example.jpg"
import "./BodyPsychologistProfile.css"
import Select from "../../Select/Select";
import MultiplySelect from "../../MultiplySelect/MultiplySelect";
import StaticClass from "../../../../static/StaticClass";
import { getAllAcademicDegreeFetch, getAllSpecializationFetch } from "../../../../fetch/OtherFetch";
import { useDispatch } from "react-redux";
import { setAcademicDegreeState } from "../../../../states/storeSlice/listAcademicDegreeSlice";
import { setSpecializationState } from "../../../../states/storeSlice/listSpecializationSlice";
import { handleUpdatePsychologistFetchProtected, handleDeletePsychologistFetchProtected, handleCreateVoucherPsychologistFetchProtected } from "../../../../fetch/AdminFetch";
import { useNavigate } from "react-router-dom";


const UpdateBodyPsychologistProfile = ({onClickBack,psychologist}) =>{
    const dispatch = useDispatch();

    const getCorrectTime = (psy) =>{
        const data = {};
        for (const key in psy) {
            if (psy.hasOwnProperty(key) && key !== 'Id_Psychologist') {
              data[key] = StaticClass.dateTimeToTimeString(psy[key]);
            }
        }
        return data;
    }

    const [psychologistData,setPsychologistData] = useState({
        Id_Psychologist: psychologist.Id_Psychologist,
        Name_Psychologist: psychologist.Name_Psychologist,
        Surname_Psychologist: psychologist.Surname_Psychologist,
        Patronymic_Psychologist: psychologist.Patronymic_Psychologist,
        Mail_Psychologist: psychologist.Mail_Psychologist,
        Experience: psychologist.Experience,
        Photo_Psychologist: "",
        Description: psychologist.Description,
        psychologistFIO : `${psychologist.Surname_Psychologist} ${psychologist.Name_Psychologist} ${psychologist.Patronymic_Psychologist}`,
        Specialization: psychologist.CollectionSpezialization.map(spezialization => spezialization.Spezialization_Name),
        Degree: psychologist.Academic_Degree.Academic_Name,
        timetable: getCorrectTime(psychologist.Timetable)

    })
    useEffect(() => {
        
        const fetchData = async () => {
            try{
                await getAllAcademicDegreeFetch().then((res)=>{
                    dispatch(setAcademicDegreeState(res.data.allAcademicDegrees))
                });
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
                const photoDataUrl = await urlToDataUrl(psychologist.Photo_Psychologist);
                setPsychologistData({
                    ...psychologistData,
                    Photo_Psychologist: photoDataUrl
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

    const academicState = useSelector(state => state.listAcademicDegreeMode);
    const specializationState = useSelector(state => state.listSpecializationMode);
    const timeStart = ['8:00', '9:00', '10:00','11:00','12:00'];
    const timeEnd = ['13:00', '14:00', '15:00','16:00','17:00','18:00'];
    const user = useSelector(state => state.currentUserSliceMode);
    const [selectedItem, setSelectedItem] = useState(psychologistData.Degree);
    const [errorMessage,setErrorMessage] = useState("");

    const [selectedTimeStartMond, setSelectedTimeStartMond] = useState(psychologistData.timetable.MondStart);
    const [selectedTimeStartTue, setSelectedTimeStartTue] = useState(psychologistData.timetable.TueStart);
    const [selectedTimeStartWen, setSelectedTimeStartWen] = useState(psychologistData.timetable.WenStart);
    const [selectedTimeStartThu, setSelectedTimeStartThu] = useState(psychologistData.timetable.ThuStart);
    const [selectedTimeStartFri, setSelectedTimeStartFri] = useState(psychologistData.timetable.FriStart);

    const [selectedTimeEndMond, setSelectedTimeEndMond] = useState(psychologistData.timetable.MondEnd);
    const [selectedTimeEndTue, setSelectedTimeEndTue] = useState(psychologistData.timetable.TueEnd);
    const [selectedTimeEndWen, setSelectedTimeEndWen] = useState(psychologistData.timetable.WenEnd);
    const [selectedTimeEndThu, setSelectedTimeEndThu] = useState(psychologistData.timetable.ThuEnd);
    const [selectedTimeEndFri, setSelectedTimeEndFri] = useState(psychologistData.timetable.FriEnd);
    const fileInputImageRef = useRef(null);

    
    

    const [verifyPsychologistData,setVerifyPsychologistData] = useState({
        psychologistFIO:false,
        Experience:false,
        Description:false,
        Mail_Psychologist:false
    })    

    const handleInputPsychologistProfileChange = (e) => {
        const { name, value } = e.target;
        let flagFIO = false;
        if(name === "psychologistFIO"){
            if(StaticClass.validateFullNamePsychologist(value)){
                setVerifyPsychologistData({...verifyPsychologistData,
                    [name]: false})
                    const parts = value.split(' ');
                    const [surnamepsy, namepsy, patronymicpsy] = parts;
                setPsychologistData({
                    ...psychologistData,
                    Name_Psychologist: namepsy,
                    Surname_Psychologist: surnamepsy,
                    Patronymic_Psychologist: patronymicpsy,
                    [name]: value
                    });
                flagFIO = true;
            }      
            else
                setVerifyPsychologistData({
                    ...verifyPsychologistData,
                    [name]: true
            })
        }
        else if (name === "Experience"){
            if(StaticClass.regexExp.test(value))
                setVerifyPsychologistData({...verifyPsychologistData,
                    [name]: false})
            else
                setVerifyPsychologistData({...verifyPsychologistData,
                    [name]: true})
        }
        else if(name === "Mail_Psychologist"){
            if(StaticClass.regexMail.test(value))
                setVerifyPsychologistData({...verifyPsychologistData,
                    [name]: false})
            else
                setVerifyPsychologistData({...verifyPsychologistData,
                    [name]: true})
        }
        else{
            if(StaticClass.regexDiscription.test(value))
                setVerifyPsychologistData({...verifyPsychologistData,
                    [name]: false})
            else
                setVerifyPsychologistData({...verifyPsychologistData,
                    [name]: true})
        }
        if(!flagFIO)
            setPsychologistData({...psychologistData,
            [name]: value});

        
    };
    
    const triggerFileSelect = () => fileInputImageRef.current.click();

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPsychologistData({...psychologistData, Photo_Psychologist: ev.target.result});
            };
            reader.readAsDataURL(file);
        }
    };

    const [selectedSpecification, setSelectedSpecification] = useState(psychologistData.Specialization);
    const handleSelectSpecification = (item) => {
        if(user.Role_Client === "Admin"){
            const index = selectedSpecification.indexOf(item);
            if (index !== -1) {
                setSelectedSpecification(selectedSpecification.filter((_, i) => i !== index));
            } else {
                setSelectedSpecification([...selectedSpecification, item]);
            }
        }
    };
    const handlePsychologistProfileDelete = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        try{
            await handleDeletePsychologistFetchProtected(psychologistData.Id_Psychologist)
            onClickBack();
        }
        catch(error){
            setErrorMessage(error.message)
        }
    }

    const handlePsychologistProfileCreateVoucher = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        try{
            const data = {Id_Psychologist: psychologistData.Id_Psychologist}
            await handleCreateVoucherPsychologistFetchProtected(data)
            onClickBack();
        }
        catch(error){
            setErrorMessage(error.message)
        }
    }

    const handlePsychologistProfileSubmit = async (e) =>{
        e.preventDefault();
        setErrorMessage("");
        try{
            if(verifyPsychologistData.psychologistFIO === false && verifyPsychologistData.Mail_Psychologist === false &&
                verifyPsychologistData.Experience === false && verifyPsychologistData.Description === false){
                    if(selectedItem !== "Выберите" && selectedSpecification.length !== 0){
                        const data = psychologistData;
                        data.timetable = {
                                MondStart:selectedTimeStartMond,
                                MondEnd: selectedTimeEndMond,
                                TueStart: selectedTimeStartTue,
                                TueEnd: selectedTimeEndTue,
                                WenStart: selectedTimeStartWen,
                                WenEnd: selectedTimeEndWen,
                                ThuStart: selectedTimeStartThu,
                                ThuEnd: selectedTimeEndThu,
                                FriStart: selectedTimeStartFri,
                                FriEnd: selectedTimeEndFri
                        }
                        data.Degree = selectedItem;
                        data.Specialization = selectedSpecification;
                        await handleUpdatePsychologistFetchProtected(data).then((res)=>{
                            onClickBack();
                        })
                    }
                    else
                        throw new Error("Не выбрана учёная степень или направление")
                }
        } catch(error){
            if(error.response)
                setErrorMessage( error.response.data.error)
            else
            setErrorMessage( error.message)
        }
        
    }
    return(
        <div className="container-psychologist-profile-body">
            <div className="container-psychologist-profile-wrapper">
                <div className="block-psychologist-profile">
                    <img className="back-arrow-psychologist-profile"
                        src={backArrow}
                        onClick={onClickBack}
                    />   
                    <div className="header-psychologist-profile">
                            <div className="image-psychologist-container-profile">
                                <img className="image-psychologist-profile"
                                    src = {psychologistData.Photo_Psychologist}
                                    alt="user"
                                    onClick={triggerFileSelect}
                                />
                            </div>
                            <input 
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                            ref={fileInputImageRef}
                            onChange={handleProfileImageChange}
                            style={{ display: 'none' }}
                            />
                        <div className="name-psychologist-profile-block">
                            <p className="name-psychologist-profile">ФИО:</p>
                            <div className="input-box psychologist-profile-input-block">
                                <input 
                                className={`${verifyPsychologistData.psychologistFIO ? 'warning-psychologist' : ''}`}
                                type="text"
                                name="psychologistFIO"
                                value={psychologistData.psychologistFIO}
                                onChange={handleInputPsychologistProfileChange} 
                                autoComplete="off" 
                                readOnly={user.Role_Client !== "Admin"}
                                placeholder="Введите ФИО" 
                                required/>
                            </div>
                        </div>
                    </div>
                    <div className="body-psychologist-profile">
                        <div className="left-side-body-psychologist-profile">
                            <p className="academic-degree-psychologist-profile">Учёная степень</p>
                            <Select
                                data={user.Role_Client !== "Admin" ? [] : academicState.Academic_Name} 
                                selectedItem={selectedItem} 
                                onSelect={setSelectedItem}
                            />
                            <p className="specification-degree-psychologist-profile">Направление</p>
                            <MultiplySelect
                                data={specializationState.Spezialization_Name}
                                selectedItems={selectedSpecification}
                                onSelect={handleSelectSpecification}
                            />
                            <p className="experience-degree-psychologist-profile">Стаж работы (год/лет):</p>
                            <div className="input-box psychologist-experience-input-block">
                                <input 
                                className={`${verifyPsychologistData.Experience ? 'warning-psychologist' : ''}`}
                                type="text"
                                value={psychologistData.Experience}
                                name="Experience"
                                onChange={handleInputPsychologistProfileChange} 
                                autoComplete="off" 
                                placeholder="стаж" 
                                readOnly={user.Role_Client !== "Admin"}
                                required/>
                            </div>
                        </div>
                        <div className="right-side-body-psychologist-profile">
                            <div className="timetable-psychologist-profile-header-block">
                                <p className="timetable-psychologist-profile-header">График работы</p>
                            </div>
                            <div className="timetable-psychologist-profile-element">
                                <p className="nameday-timetable-element">Понедельник:</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeStart} 
                                    selectedItem={selectedTimeStartMond} 
                                    onSelect={setSelectedTimeStartMond}
                                />
                                <p className="endtime-timetable-element">до</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] :timeEnd} 
                                    selectedItem={selectedTimeEndMond} 
                                    onSelect={setSelectedTimeEndMond}
                                />
                            </div>
                            <div className="timetable-psychologist-profile-element">
                                <p className="nameday-timetable-element">Вторник:</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeStart} 
                                    selectedItem={selectedTimeStartTue} 
                                    onSelect={setSelectedTimeStartTue}
                                />
                                <p className="endtime-timetable-element">до</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeEnd} 
                                    selectedItem={selectedTimeEndTue} 
                                    onSelect={setSelectedTimeEndTue}
                                />
                            </div>
                            <div className="timetable-psychologist-profile-element">
                                <p className="nameday-timetable-element">Среда:</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeStart} 
                                    selectedItem={selectedTimeStartWen} 
                                    onSelect={setSelectedTimeStartWen}
                                />
                                <p className="endtime-timetable-element">до</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeEnd} 
                                    selectedItem={selectedTimeEndWen} 
                                    onSelect={setSelectedTimeEndWen}
                                />
                            </div>
                            <div className="timetable-psychologist-profile-element">
                                <p className="nameday-timetable-element">Четверг:</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeStart} 
                                    selectedItem={selectedTimeStartThu} 
                                    onSelect={setSelectedTimeStartThu}
                                />
                                <p className="endtime-timetable-element">до</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeEnd} 
                                    selectedItem={selectedTimeEndThu} 
                                    onSelect={setSelectedTimeEndThu}
                                />
                            </div>
                            <div className="timetable-psychologist-profile-element">
                                <p className="nameday-timetable-element">Пятница:</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeStart} 
                                    selectedItem={selectedTimeStartFri} 
                                    onSelect={setSelectedTimeStartFri}
                                />
                                <p className="endtime-timetable-element">до</p>
                                <Select
                                    data={user.Role_Client !== "Admin" ? [] : timeEnd} 
                                    selectedItem={selectedTimeEndFri} 
                                    onSelect={setSelectedTimeEndFri}
                                />
                            </div>
                            <div className="email-psychologist-profile-block">
                            <p className="name-psychologist-profile">Почта:</p>
                            <div className="input-box psychologist-profile-input-block">
                                <input 
                                className={`${verifyPsychologistData.Mail_Psychologist ? 'warning-psychologist' : ''}`}
                                type="text"
                                value={psychologistData.Mail_Psychologist}
                                name="Mail_Psychologist"
                                onChange={handleInputPsychologistProfileChange} 
                                autoComplete="off" 
                                placeholder="Введите почту" 
                                readOnly
                                required/>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="description-block-body-psychologist-profile">
                        <p className="description-header-psychologist-profile">Описание</p>
                        <textarea name="Description" value={psychologistData.Description}
                        className={`${verifyPsychologistData.Description ? 'warning-psychologist description-area-psychologist-profile' : 'description-area-psychologist-profile'}`}
                        readOnly={user.Role_Client !== "Admin"}
                        onChange={handleInputPsychologistProfileChange} placeholder="Напишите описание"></textarea>
                    </div>
                    <div className="error-mesage-psychologist-profile">
                        {errorMessage}
                    </div>
                    {
                        user.Role_Client === "Admin" ?
                        <div className="botton-block-psychologist-profile">
                            <button className="create-vouncher-botton-psychologist-profile" onClick={handlePsychologistProfileCreateVoucher} type="button">талончик</button>
                            <button className="save-botton-psychologist-profile" onClick={handlePsychologistProfileSubmit}  type="button">Изменить</button>
                            <button className="delete-botton-psychologist-profile" onClick={handlePsychologistProfileDelete} type="button">Удалить</button>
                        </div>:
                        <></>
                    }                      
                </div>
            </div>
        </div>
    );   
}
export default UpdateBodyPsychologistProfile;
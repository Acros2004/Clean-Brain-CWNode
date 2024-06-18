class StaticClass {
    static regexFIO = /^[a-zA-Zа-яА-Я]{1,15}$/;
    static regexMail = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]{1,10}\.[a-zA-Z]{2,3}$/;
    static regexLogin = /^[a-zA-Z0-9]{1,13}$/;
    static regexPassword = /^[a-zA-Z0-9]{4,13}$/;
    static regexExp = /^(?:[1-9]|[1-4][0-9]|50)$/;
    static regexDiscription = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,275}$/;
    static regexPrice = /^([1-9]\d{0,3}|10000)$/;
    static regexNameProcedure = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,20}$/;
    static regexDepiction = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,122}$/;
    static regexNumberSearch = /^[0-9\b]+$/;
    static regexCode = /^\d{6}$/;
    static regexReview = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,130}$/
    
    static dateTimeToTimeString(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        return `${hours}:00`;
    }

    static getCorrectPsychologistDateAndTime = (psychologist) => {
        const correctPsychologist = psychologist;
        correctPsychologist.Voucher = psychologist.Voucher.filter(voucher => voucher.Ordered.trim() === "Нет");
        correctPsychologist.Voucher = correctPsychologist.Voucher.map(voucher => {
            const date = new Date(voucher.Date_Voucher);
            const timeStart = new Date(voucher.Time_Voucher_Start);
            const timeEnd = new Date(voucher.Time_Voucher_End);
            timeStart.setHours(timeStart.getHours());
            console.log(timeStart);
            timeEnd.setHours(timeEnd.getHours());
            return {
                ...voucher,
                Date_Voucher: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, // +1, так как месяцы в JavaScript нумеруются с 0
                Time_Voucher_Start: `${timeStart.getHours()}:00`,
                Time_Voucher_End: `${timeEnd.getHours()}:00`
            };
        });
        return correctPsychologist;
    }
    static getCorrectVoucher = (voucher) =>{
        const correctVoucher = voucher;
        const date = new Date(correctVoucher.Date_Voucher);
        const timeStart = new Date(correctVoucher.Time_Voucher_Start);
        const timeEnd = new Date(correctVoucher.Time_Voucher_End);
        timeStart.setHours(timeStart.getHours());
        timeEnd.setHours(timeEnd.getHours());
        return {
            ...correctVoucher,
            Date_Voucher: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, // +1, так как месяцы в JavaScript нумеруются с 0
            Time_Voucher_Start: `${timeStart.getHours()}:00`,
            Time_Voucher_End: `${timeEnd.getHours()}:00`
        };
    }
    
    

    static getFullNamePsychologist = (Surname_Psychologist,Name_Psychologist,Patronymic_Psychologist) =>{
        return `${Surname_Psychologist} ${Name_Psychologist} ${Patronymic_Psychologist}`;
    }
    static getArraySpecializationsPsychologist = (specializations) =>{
        return specializations.map(specialization => specialization.Spezialization_Name)
    }
    

    static validateFullNamePsychologist(fullName) {
        const nameRegex = /^[А-ЯЁ][а-яё]{2,15}$/;
        const surnameRegex = /^[А-ЯЁ][а-яё]{3,20}$/;
        const patronymicRegex = /^[А-ЯЁ][а-яё]{5,15}$/;
        

        const parts = fullName.split(' ');

        if (parts.length !== 3) {
            return false; 
        }

        const [surname, name, patronymic] = parts;
        if (!nameRegex.test(name)) {
            return false; 
        }
        console.log("Тест фамилии:" + surname)
        if (!surnameRegex.test(surname)) {    
            return false; 
        }
        if (!patronymicRegex.test(patronymic)) {
            return false; 
        }
    
        return true; 
    }
}

export default StaticClass;
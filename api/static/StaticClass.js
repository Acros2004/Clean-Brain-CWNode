import UnitOfWork from "../UnitOfWork/UnitOfWork.js";

class StaticClass {
    static unit = new UnitOfWork();

    static userSockets = [];

    static parseTimeStringToDateTime(timeString) {
        const [hours, minutes] = timeString.split(':'); 
        const date = new Date();
        date.setHours(parseInt(hours, 10)); 
        date.setMinutes(parseInt(minutes, 10));
        date.setSeconds(0);
      
        return date;
    }
    static getCorrectTime(psy){
        const data = {};
        for (const key in psy) {
            if (psy.hasOwnProperty(key) && key !== 'Id_Psychologist' && key !== 'Id_Voucher' && key !== 'Ordered') {
              data[key] = new Date(psy[key]);
            }
            else{
                data[key] = psy[key];
            }
        }
        return data;
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
            Date_Voucher: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
            Time_Voucher_Start: `${timeStart.getHours()}:00`,
            Time_Voucher_End: `${timeEnd.getHours()}:00`
        };
    }

    static getAuthMessage = (code)=>{
        return `
        <html>
            <body>
                <h1 style='font-size: 30px'>Clean Brain</h1>
                <p style='font-size: 18pt;'>Аутентификация</p>
                <p style='font-size: 18pt;'>Ваш код: ${code}.</p>
            </body>
        </html>`
    }
    static getClientBookingSuccessMessage = (NameProc,fioPsy,SelectDate,SelectTime)=>{
        return `
        <html>
                <body>
                    <h1 style='font-size: 30px'>Clean Brain</h1>
                    <p style='font-size: 18pt;'>Оформление Сеанса.</p>
                    <p style='font-size: 18pt;'>Здравствуйте, вы оформили услугу: ${NameProc}.</p>
                    <p style='font-size: 18pt;'>Вашим личным психологом выступит ${fioPsy}. Дата сеанса: ${SelectDate}, на время ${SelectTime}. Не опаздывайте)</p>
                </body>
        </html>`
    }
    static getPsychologistBookingSuccessMessage = (fioPsy,NameClient,Id_Client,NameProc,SelectDate,SelectTime)=>{
        return `
        <html>
                <body>
                    <h1 style='font-size: 30px'>Clean Brain</h1>
                    <p style='font-size: 18pt;'>Оформление Сеанса.</p>
                    <p style='font-size: 18pt;'>Здравствуйте ${fioPsy}, клиент ${NameClient} c id:${Id_Client} оформил услугу: ${NameProc}.</p>
                    <p style='font-size: 18pt;'>Дата сеанса: ${SelectDate}, на время ${SelectTime}.</p>
                </body>
        </html>`
    }
    static getClientBookingCanceledMessage = (NameProc,SelectDate,SelectTime)=>{
        return `
        <html>
                <body>
                    <h1 style='font-size: 30px'>Clean Brain</h1>
                    <p style='font-size: 18pt;'>Отмена сеанса.</p>
                    <p style='font-size: 18pt;'>Здравствуйте, вы отменили услугу: ${NameProc}.</p>
                    <p style='font-size: 18pt;'>Дата сеанса: ${SelectDate}, на время ${SelectTime}</p>
                </body>
        </html>`
    }
    static getPsychologistBookingCanceledMessage = (fioPsy,NameClient,Id_Client,NameProc,SelectDate,SelectTime)=>{
        return `
        <html>
                <body>
                    <h1 style='font-size: 30px'>Clean Brain</h1>
                    <p style='font-size: 18pt;'>Отмена сеанса.</p>
                    <p style='font-size: 18pt;'>Здравствуйте ${fioPsy}, клиент ${NameClient} c id:${Id_Client} отменил услугу: ${NameProc}.</p>
                    <p style='font-size: 18pt;'>Дата сеанса: ${SelectDate}, на время ${SelectTime}.</p>
                </body>
        </html>`
    }
}

export default StaticClass;

  

  
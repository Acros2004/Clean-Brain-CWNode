import StaticClass from "../static/StaticClass.js";
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js";
import BookingService from "./Booking.js";

class VoucherService{

    static async deleteExpiredVouchers() {
        const currentDate = new Date();
        const currentTime = currentDate.getTime(); 
        const vouchers = await StaticClass.unit.voucherRepository.getAll();
      
        for (const voucher of vouchers) {
            if (voucher) {
              const voucherStartDateTime = new Date(voucher.Date_Voucher);
              const voucherStartTime = new Date(voucher.Time_Voucher_Start);         
              voucherStartDateTime.setHours(voucherStartTime.getHours(), voucherStartTime.getMinutes(), voucherStartTime.getSeconds());
              if ( voucherStartDateTime.getTime() < currentTime) {
                await BookingService.deleteBookingByVoucher(voucher.Id_Voucher);
                await StaticClass.unit.voucherRepository.delete(voucher.Id_Voucher);
              }
            }
        }
    }

    static async getVoucher(Id_Voucher){
        const voucher = await StaticClass.unit.voucherRepository.findById(Id_Voucher);
        if(!voucher)
            throw new Conflict("Талончик не существует");
        return voucher;
    }
    static async deleteVoucherByPsychologist(Id_Psychologist){
        const vouchers = await StaticClass.unit.voucherRepository.findByPsychologistId(Id_Psychologist);
        for (const voucher of vouchers) {
            await BookingService.deleteBookingByVoucher(voucher.Id_Voucher);
        }
        await StaticClass.unit.voucherRepository.deleteAllById(Id_Psychologist);
    }
    static async updateVoucher(Id_Voucher,data){
        const {Ordered} = data;
        const voucher = await StaticClass.unit.voucherRepository.findById(Id_Voucher);
        if(!voucher)
            throw new Conflict("Талончик не существует");
        const newVoucher = await StaticClass.unit.voucherRepository.update(Id_Voucher,{Ordered});
        return newVoucher;
    }
    static async createVouchers(id) {
        await StaticClass.unit.voucherRepository.deleteNotOrdered(id);
        const psychologist = await StaticClass.unit.psychologistRepository.findByIdWithAllInfo(id)
        if(!psychologist)
            throw new Conflict("Психолога не существует");
        let timeNow = new Date();
        timeNow.setDate(timeNow.getDate() + 1);
        timeNow.setMinutes(0);

        const table = StaticClass.getCorrectTime(psychologist.Timetable)
        let currentVouncher = [];
        for (const voucher of psychologist.Voucher) {
            currentVouncher.push(StaticClass.getCorrectTime(voucher)); 
        }    
        
        const monVoun = currentVouncher.filter(item => item.Date_Voucher.getDay() === 1);
        const tueVoun = currentVouncher.filter(item => item.Date_Voucher.getDay() === 2);
        const wenVoun = currentVouncher.filter(item => item.Date_Voucher.getDay() === 3);
        const thuVoun = currentVouncher.filter(item => item.Date_Voucher.getDay() === 4);
        const friVoun = currentVouncher.filter(item => item.Date_Voucher.getDay() === 5);
        const timeEnd = new Date(timeNow);
        timeEnd.setDate(timeEnd.getDate() + 14);
        timeEnd.setMinutes(0);
        
        while (timeNow < timeEnd) {
            let flagAdd = false;
            switch (timeNow.getDay()) {
                case 1: // Monday
                    if (timeNow.getHours() >= table.MondStart.getHours() && timeNow.getHours() < table.MondEnd.getHours()) {
                        let flagExists = false;
                        for (const item of monVoun) {
                            if (item.Time_Voucher_Start.getHours() === timeNow.getHours()) {
                                flagExists = true;
                                break;
                            }
                        }
                        if (!flagExists) {
                            const voucher = {};
                            voucher.Date_Voucher = new Date(timeNow);
                            voucher.Time_Voucher_Start = new Date(timeNow);
                            timeNow.setHours(timeNow.getHours() + 1);
                            voucher.Time_Voucher_End = new Date(timeNow);
                            voucher.Ordered = "Нет";
                            voucher.Id_Psychologist = id;
                            await StaticClass.unit.voucherRepository.create(voucher);
                            flagAdd = true;
                        }
                    }
                    break;
                case 2: // Tuesday
                    if (timeNow.getHours() >= table.TueStart.getHours() && timeNow.getHours() < table.TueEnd.getHours()) {
                        let flagExists = false;
                        for (const item of tueVoun) {
                            if (item.Time_Voucher_Start.getHours() === timeNow.getHours()) {
                                flagExists = true;
                                break;
                            }
                        }
                        if (!flagExists) {
                            const voucher = {};
                            voucher.Date_Voucher = new Date(timeNow);
                            voucher.Time_Voucher_Start = new Date(timeNow);
                            timeNow.setHours(timeNow.getHours() + 1);
                            voucher.Time_Voucher_End = new Date(timeNow);
                            voucher.Ordered = "Нет";
                            voucher.Id_Psychologist = id;
                            await StaticClass.unit.voucherRepository.create(voucher);
                            flagAdd = true;
                        }
                    }
                    break;
                case 3: // Wednesday
                    if (timeNow.getHours() >= table.WenStart.getHours() && timeNow.getHours() < table.WenEnd.getHours()) {
                        let flagExists = false;
                        for (const item of wenVoun) {
                            if (item.Time_Voucher_Start.getHours() === timeNow.getHours()) {
                                flagExists = true;
                                break;
                            }
                        }
                        if (!flagExists) {
                            const voucher = {};
                            voucher.Date_Voucher = new Date(timeNow);
                            voucher.Time_Voucher_Start = new Date(timeNow);
                            timeNow.setHours(timeNow.getHours() + 1);
                            voucher.Time_Voucher_End = new Date(timeNow);
                            voucher.Ordered = "Нет";
                            voucher.Id_Psychologist = id;
                            await StaticClass.unit.voucherRepository.create(voucher);
                            flagAdd = true;
                        }
                    }
                    break;
                case 4: // Thursday
                    if (timeNow.getHours() >= table.ThuStart.getHours() && timeNow.getHours() < table.ThuEnd.getHours()) {
                        let flagExists = false;
                        for (const item of thuVoun) {
                            if (item.Time_Voucher_Start.getHours() === timeNow.getHours()) {
                                flagExists = true;
                                break;
                            }
                        }
                        if (!flagExists) {
                            const voucher = {};
                            voucher.Date_Voucher = new Date(timeNow);
                            voucher.Time_Voucher_Start = new Date(timeNow);
                            timeNow.setHours(timeNow.getHours() + 1);
                            voucher.Time_Voucher_End = new Date(timeNow);
                            voucher.Ordered = "Нет";
                            voucher.Id_Psychologist = id;
                            await StaticClass.unit.voucherRepository.create(voucher);
                            flagAdd = true;
                        }
                    }
                    break;
                case 5: // Friday
                    if (timeNow.getHours() >= table.FriStart.getHours() && timeNow.getHours() < table.FriEnd.getHours()) {
                        let flagExists = false;
                        for (const item of friVoun) {
                            if (item.Time_Voucher_Start.getHours() === timeNow.getHours()) {
                                flagExists = true;
                                break;
                            }
                        }
                        if (!flagExists) {
                            const voucher = {};
                            voucher.Date_Voucher = new Date(timeNow);
                            voucher.Time_Voucher_Start = new Date(timeNow);
                            timeNow.setHours(timeNow.getHours() + 1);
                            voucher.Time_Voucher_End = new Date(timeNow);
                            voucher.Ordered = "Нет";
                            voucher.Id_Psychologist = id;
                            await StaticClass.unit.voucherRepository.create(voucher);
                            flagAdd = true;
                        }
                    }
                    break;
                default:
                    break;
            }
            if (!flagAdd)
                timeNow.setHours(timeNow.getHours() + 1);
        }
    }
    
}

export default VoucherService;
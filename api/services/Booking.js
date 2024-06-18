import StaticClass from "../static/StaticClass.js";
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js";
import ProcedureService from "./Procedure.js";
import VoucherService from "./Voucher.js";
import PsychologistService from "./Psychologist.js";
import { sendMessageToEmail } from "../utils/Nodemailer.js";


class BookingService{

    static async deleteExpiredBookings() {
        const currentDate = new Date();
        const currentTime = currentDate.getTime(); 
      
        const bookings = await StaticClass.unit.bookingRepository.getAllWithInfo();
      
        for (const booking of bookings) {
            const voucher = booking.Voucher;
            if (voucher) {
              const voucherStartDateTime = new Date(voucher.Date_Voucher);
              const voucherStartTime = new Date(voucher.Time_Voucher_Start);
              voucherStartDateTime.setHours(voucherStartTime.getHours(), voucherStartTime.getMinutes(), voucherStartTime.getSeconds());
      
              if ( voucherStartDateTime.getTime() < currentTime) {
                await StaticClass.unit.bookingRepository.delete(booking.ID_Booking);
              }
            }
        }
    }

    static async createBooking(Id_Client,Id_Procedure,Id_Voucher){
        const procedure = await ProcedureService.getProcedure(Id_Procedure);
        const voucher = await VoucherService.getVoucher(Id_Voucher);
        if(voucher.Ordered.trim() !== "Нет")
            throw new Conflict("Талончик занят");
        const psychologist = await PsychologistService.getPsychologist(voucher.Id_Psychologist);
        const arraySpecializationPsychologist = psychologist.CollectionSpezialization.map(specialization => specialization.Spezialization_Name);
        if (!arraySpecializationPsychologist.includes(procedure.Spezialization_Procedure)){
            throw new Conflict("Несовпадение направления");
        }
        const booking = {Id_Procedure, Id_Client, Id_Voucher};
        booking.Time_Booking = booking.Date_Booking = new Date();

        const newBooking = await StaticClass.unit.bookingRepository.create(booking);
        await VoucherService.updateVoucher(Id_Voucher,{Ordered: "Да"})

        const user = await StaticClass.unit.clientRepository.findById(Id_Client);
        const fioPsychologist = `${psychologist.Surname_Psychologist} ${psychologist.Name_Psychologist} ${psychologist.Patronymic_Psychologist}`;
        const voucherWithLocationTime = StaticClass.getCorrectVoucher(voucher);
        sendMessageToEmail(user.Mail_Client,"Оформление сеанса",StaticClass.getClientBookingSuccessMessage(procedure.Name_Procedure,fioPsychologist,voucherWithLocationTime.Date_Voucher,voucherWithLocationTime.Time_Voucher_Start))
        sendMessageToEmail(psychologist.Mail_Psychologist,"Оформление сеанса",StaticClass.getPsychologistBookingSuccessMessage(fioPsychologist,user.Name_Client,Id_Client,procedure.Name_Procedure,voucherWithLocationTime.Date_Voucher,voucherWithLocationTime.Time_Voucher_Start))
        
        return newBooking;
    }
    static async deleteBookingByVoucher(Id_Voucher){
        await StaticClass.unit.bookingRepository.deleteByVoucherId(Id_Voucher);
    }
    static async deleteBookingByProcedure(Id_Procedure){
        await StaticClass.unit.bookingRepository.deleteByProcedureId(Id_Procedure);
    }
    static async deleteBooking(ID_Booking,Id_Client){
        const booking = await StaticClass.unit.bookingRepository.findById(ID_Booking);
        if(booking){
            if(booking.Id_Client !== Id_Client)
            throw new Conflict("У клиента нет такого сеанса");
        }
        else{
            throw new Conflict("Cеанса не существует");
        }

        const procedure = await ProcedureService.getProcedure(booking.Id_Procedure);
        const voucher = await VoucherService.getVoucher(booking.Id_Voucher);
        const voucherWithLocationTime = StaticClass.getCorrectVoucher(voucher);
        const psychologist = await PsychologistService.getPsychologist(voucher.Id_Psychologist);
        const fioPsychologist = `${psychologist.Surname_Psychologist} ${psychologist.Name_Psychologist} ${psychologist.Patronymic_Psychologist}`;
        const user = await StaticClass.unit.clientRepository.findById(Id_Client);
        
        await VoucherService.updateVoucher(booking.Id_Voucher,{Ordered:"Нет"})
        await StaticClass.unit.bookingRepository.delete(ID_Booking);
        
        sendMessageToEmail(user.Mail_Client,"Отмена сеанса",StaticClass.getClientBookingCanceledMessage(procedure.Name_Procedure,voucherWithLocationTime.Date_Voucher,voucherWithLocationTime.Time_Voucher_Start))
        sendMessageToEmail(psychologist.Mail_Psychologist,"Отмена сеанса",StaticClass.getPsychologistBookingCanceledMessage(fioPsychologist,user.Name_Client,Id_Client,procedure.Name_Procedure,voucherWithLocationTime.Date_Voucher,voucherWithLocationTime.Time_Voucher_Start))
    }

    static async getBookingsByIdClient(Id_Client){
        await BookingService.deleteExpiredBookings();
        const bookings = await StaticClass.unit.bookingRepository.findByClientId(Id_Client);
        return bookings;
    }
    
}

export default BookingService;
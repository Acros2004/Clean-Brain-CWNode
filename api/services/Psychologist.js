import StaticClass from "../static/StaticClass.js";
import cloudinary from "cloudinary"
import TimeTableService from "./TimeTable.js";
import CollectionSpezializationService from "./CollectionSpezialization.js";
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js";
import VoucherService from "./Voucher.js";

class PsychologistService{
    static async getAllPsychologists(){
        const allPsychologist = await StaticClass.unit.psychologistRepository.getAll();
        return allPsychologist;
    }
    static async createPsychologist(data){
        const {Name_Psychologist,Surname_Psychologist,Patronymic_Psychologist,Mail_Psychologist,Photo_Psychologist,Experience,Description,Degree} = data;
        const psychologistData =  await StaticClass.unit.psychologistRepository.findByFIO(Name_Psychologist,Surname_Psychologist,Patronymic_Psychologist);
        if (psychologistData.length != 0){
          throw new Conflict("Психолог с таким ФИО уже существует");
        }
        const psychologistDataEmail =   await StaticClass.unit.psychologistRepository.findByEmail(Mail_Psychologist);
        if (psychologistDataEmail.length != 0){
          throw new Conflict("Психолог с такой почтой уже существует");
        }
        const myCloud = await cloudinary.v2.uploader.upload(Photo_Psychologist)
        const psychologist = await StaticClass.unit.psychologistRepository.create({Name_Psychologist,Surname_Psychologist,Patronymic_Psychologist,Mail_Psychologist,Experience: parseInt(Experience, 10),Photo_Psychologist:myCloud.secure_url,Description,Degree});
        return psychologist;
    }

    static async updatePsychologist(data){
        const {Id_Psychologist,Name_Psychologist,Surname_Psychologist,Patronymic_Psychologist,Photo_Psychologist,Experience,Description,Degree} = data;
        
        const psychologistData =  await StaticClass.unit.psychologistRepository.findByFIO(Name_Psychologist,Surname_Psychologist,Patronymic_Psychologist);

        if (psychologistData.length != 0){
            if(psychologistData[0].Id_Psychologist != Id_Psychologist)
                throw new Conflict("Психолог с таким ФИО уже существует");
        }
        const myCloud = await cloudinary.v2.uploader.upload(Photo_Psychologist)
        await StaticClass.unit.psychologistRepository.update(Id_Psychologist,{Name_Psychologist,Surname_Psychologist,Patronymic_Psychologist,Experience: parseInt(Experience, 10),Photo_Psychologist:myCloud.secure_url,Description,Degree});
        const psychologist =  await StaticClass.unit.psychologistRepository.findById(Id_Psychologist);
        return psychologist;
    }
    static async deletePsychologist(Id_Psychologist){
        const psychologist = StaticClass.unit.psychologistRepository.findById(Id_Psychologist);
        if(!psychologist)
            throw new Conflict("Психолога не существует");
        await VoucherService.deleteVoucherByPsychologist(Id_Psychologist);
        await TimeTableService.deleteTimeTable(Id_Psychologist);
        await CollectionSpezializationService.deleteCollectionSpezialization(Id_Psychologist);
        await StaticClass.unit.psychologistRepository.delete(Id_Psychologist);
    }
    static async getPsychologist(Id_Psychologist){
        await VoucherService.deleteExpiredVouchers();
        const psychologist = await StaticClass.unit.psychologistRepository.findByIdWithAllInfo(Id_Psychologist);
        if(!psychologist)
            throw new Conflict("Психолога не существует");
        return psychologist;
    }

  
}

export default PsychologistService;
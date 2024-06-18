import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";
import { OnlyIdProcedureSchema } from "./Procedure.js";
import { OnlyIdPsychologistSchema } from "./Psychologist.js";
import { OnlyIdReviewSchema } from "./Review.js";

export const createTimeTableSchema = Yup.object({
    MondStart: Yup.string().required().matches(/8:00|9:00|10:00|11:00|12:00/),
    MondEnd: Yup.string().required().matches(/13:00|14:00|15:00|16:00|17:00|18:00/),
    TueStart: Yup.string().required().matches(/8:00|9:00|10:00|11:00|12:00/),
    TueEnd: Yup.string().required().matches(/13:00|14:00|15:00|16:00|17:00|18:00/),
    WenStart: Yup.string().required().matches(/8:00|9:00|10:00|11:00|12:00/),
    WenEnd: Yup.string().required().matches(/13:00|14:00|15:00|16:00|17:00|18:00/),
    ThuStart: Yup.string().required().matches(/8:00|9:00|10:00|11:00|12:00/),
    ThuEnd: Yup.string().required().matches(/13:00|14:00|15:00|16:00|17:00|18:00/),
    FriStart: Yup.string().required().matches(/8:00|9:00|10:00|11:00|12:00/),
    FriEnd: Yup.string().required().matches(/13:00|14:00|15:00|16:00|17:00|18:00/)
})
export const createPsychologistSchema = Yup.object({
  body: Yup.object({
    Name_Psychologist: Yup.string().required().matches(/^[А-ЯЁ][а-яё]{2,15}$/),
    Surname_Psychologist: Yup.string().required().matches(/^[А-ЯЁ][а-яё]{3,20}$/),
    Patronymic_Psychologist: Yup.string().required().matches(/^[А-ЯЁ][а-яё]{5,15}$/),
    Mail_Psychologist: Yup.string().required().matches(/^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]{1,10}\.[a-zA-Z]{2,3}$/),
    Photo_Psychologist: Yup.lazy((value) =>
        /^data:image\/(png|jpeg|jpg);base64,/.test(value)
          ? Yup.string()
              .trim()
              .matches(
                /^data:image\/(png|jpeg|jpg|gif);base64,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
                'Must be a valid base64 encoded image',
              )
              .required()
          : Yup.string().trim().url('Must be a valid URL').required(),
    ),
    Experience: Yup.string().required().matches(/^(?:[1-9]|[1-4][0-9]|50)$/),
    Description: Yup.string().required().matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,275}$/),
    Degree: Yup.string().required().matches(/(Бакалавр|Доктор наук|Магистр|Профессор)/),
    Specialization: Yup.array().of(Yup.string().matches(/(Клиническая|Когнитивная|Развивающая|Социальная)/)),
    timetable: createTimeTableSchema
  })   
})
export const updatePsychologistSchema = Yup.object({
    body: Yup.object({
        Id_Psychologist: Yup.number().required(), 

    }),
    ...createPsychologistSchema.fields
});
export const createProcedureSchema = Yup.object({
    body: Yup.object({
      Name_Procedure: Yup.string().required().matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,20}$/),
      Price: Yup.string().required().matches(/^([1-9]\d{0,3}|10000)$/),
      Depiction: Yup.string().required().matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,122}$/),
      Spezialization_Procedure: Yup.string().required().matches(/(Клиническая|Когнитивная|Развивающая|Социальная)/),
      Photo_Procedure: Yup.lazy((value) =>
        /^data:image\/(png|jpeg|jpg);base64,/.test(value)
          ? Yup.string()
              .trim()
              .matches(
                /^data:image\/(png|jpeg|jpg|gif);base64,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
                'Must be a valid base64 encoded image',
              )
              .required()
          : Yup.string().trim().url('Must be a valid URL').required(),
      )
    })   
})
export const createVoucherSchema = Yup.object({
    body: Yup.object({
        Id_Psychologist: Yup.number().required(), 
    })
});

export const updateProcedureSchema = Yup.object({
    body: Yup.object({
        Id_Procedure: Yup.number().required(), 

    }),
    ...createProcedureSchema.fields
});



class AdminValidator {

    static async createPsychologist(req, res, next) { 
        return validateRequest(req, res, next, createPsychologistSchema);
    }
    static async updatePsychologist(req, res, next) { 
        return validateRequest(req, res, next, updatePsychologistSchema);
    }
    static async createProcedure(req, res, next) { 
        return validateRequest(req, res, next, createProcedureSchema);
    }
    static async updateProcedure(req, res, next) { 
        return validateRequest(req, res, next, updateProcedureSchema);
    }
    static async createPsychologistVoucher(req, res, next) { 
        return validateRequest(req, res, next, createVoucherSchema);
    }
    static async deletePsychologist(req, res, next) { 
        return validateRequest(req, res, next, OnlyIdPsychologistSchema);
    }
    static async deleteProcedure(req, res, next) { 
        return validateRequest(req, res, next, OnlyIdProcedureSchema);
    }
    static async deleteReviewClient(req, res, next) { 
        return validateRequest(req, res, next, OnlyIdReviewSchema);
    }
}

export default AdminValidator;

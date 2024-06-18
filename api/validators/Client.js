import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";

export const updateClientSchema = Yup.object({
    body: Yup.object({
      Name_Client: Yup.string().required().matches(/^[a-zA-Zа-яА-Я]{1,15}$/),
      Surname_Client: Yup.string().required().matches(/^[a-zA-Zа-яА-Я]{1,15}$/),
      Photo_Client: Yup.lazy((value) =>
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
    })   
})
export const createBookingSchema = Yup.object({
    body: Yup.object({
      Id_Procedure: Yup.number().required(),
      Id_Voucher: Yup.number().required()
    })   
})

export const createReviewSchema = Yup.object({
    body: Yup.object({
      Review: Yup.string().required().matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,!?():;]{1,130}$/)
    })
})
export const deleteReviewSchema = Yup.object({
    params: Yup.object({
      Id_Review: Yup.number().required()
    })   
})
export const deleteBookingSchema = Yup.object({
    params: Yup.object({
      ID_Booking: Yup.number().required()
    })   
})

class ClientValidator {
  static async updateClientInfo(req, res, next) {
    return validateRequest(req, res, next, updateClientSchema);
  }
  static async createBookingClient(req, res, next) {
    return validateRequest(req, res, next, createBookingSchema);
  }

  static async getBookingsClient(req, res, next) {
    return validateRequest(req, res, next);
  }

  static async createReviewClient(req, res, next) {
    return validateRequest(req, res, next, createReviewSchema);
  }

  static async deleteReviewClient(req, res, next) {
    return validateRequest(req, res, next, deleteReviewSchema);
  }
  static async deleteBookingClient(req, res, next) {
    return validateRequest(req, res, next, deleteBookingSchema);
  }
  

}

export default ClientValidator;

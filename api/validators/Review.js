import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";

export const OnlyIdReviewSchema = Yup.object({
    params: Yup.object({
        Id_Review: Yup.number().required()
    })   
})

class  ReviewValidator {
  static async getAllReviews(req, res, next) {
    return validateRequest(req, res, next);
  }
}

export default ReviewValidator;

import TokenService from "./Token.js";
import StaticClass from "../static/StaticClass.js";
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js";
import ClientService from "./Client.js";

class ReviewService{
    static async getAllReviews(){
        const allReviews = await StaticClass.unit.reviewRepository.getAll();
        const allClients = await ClientService.getAllClients();

        for (let i = 0; i < allReviews.length; i++) {
        const review = allReviews[i];
        const clientId = review.Id_Client;

            for (let j = 0; j < allClients.length; j++) {
                const client = allClients[j];
                if (client.Id_client === clientId) {
                    review.Client = {Name_Client: client.Name_Client,Photo_Client: client.Photo_Client};
                    break;
                }
            }
        }
        return allReviews;
    }
    static async createReview(data){
        const {Review,Id_Client} = data;
        const reviewData =  await StaticClass.unit.reviewRepository.findByClientId(Id_Client);
        if (reviewData.length != 0){
          throw new Conflict("У пользователя уже оставлен отзыв");
        }
        const review = await StaticClass.unit.reviewRepository.create({Review,Id_Client});
        return review;
    }
    static async deleteReview(Id_Review, Id_Client){
        const review = await StaticClass.unit.reviewRepository.findById(Id_Review);
        if(!review)
            throw new Conflict("Отзыв не существует");
        if(Id_Client !== review.Id_Client)
            throw new Conflict("Вы не можете удалить отзыв");
        
        StaticClass.unit.reviewRepository.delete(Id_Review);
    }
    static async deleteReviewWithoutClient(Id_Review){
        const review = await StaticClass.unit.reviewRepository.findById(Id_Review);
        if(!review)
            throw new Conflict("Отзыв не существует");
        StaticClass.unit.reviewRepository.delete(Id_Review);
    }
    

  
}

export default ReviewService;
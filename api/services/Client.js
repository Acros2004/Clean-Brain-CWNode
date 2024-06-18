import TokenService from "./Token.js";
import StaticClass from "../static/StaticClass.js";
import cloudinary from "cloudinary"
import BookingService from "./Booking.js";
import ReviewService from "./Review.js";

class ClientService{
    static async updateClientInfo(Name_Client,Surname_Client,Photo_Client, user){
        user.Name_Client = Name_Client;
        user.Surname_Client = Surname_Client;       
        const myCloud = await cloudinary.v2.uploader.upload(Photo_Client)
        user.Photo_Client = myCloud.secure_url;
        await StaticClass.unit.clientRepository.update(user.Id_client,user);
        const newUser = await StaticClass.unit.clientRepository.findById(user.Id_client); 
        return newUser;
    }
    static async createBookingClient(Id_Procedure,Id_Voucher, user){
        const booking = await BookingService.createBooking(user.Id_client, Id_Procedure,Id_Voucher);
        return booking;
    }
    static async createReviewClient(Review, user){
        const review = await ReviewService.createReview({Id_Client: user.Id_client, Review});
        return review;
    }
    static async getBookingsClient(user){
        const bookings = await BookingService.getBookingsByIdClient(user.Id_client);
        return bookings;
    }
    static async deleteReviewClient(Id_Review, user){
        await ReviewService.deleteReview(Id_Review,user.Id_client);
    }
    static async deleteBookingClient(ID_Booking, user){
        await BookingService.deleteBooking(ID_Booking,user.Id_client);
    }
    static async getAllClients(){
        const clients = await StaticClass.unit.clientRepository.getAll();
        return clients;
    }
}

export default ClientService;
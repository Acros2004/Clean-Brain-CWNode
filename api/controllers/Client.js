import ErrorUtils from "../utils/Errors.js";
import ClientService from "../services/Client.js";

class ClientController {
    static async updateClientInfo(req,res){
        const {Name_Client,Surname_Client,Photo_Client} = req.body;
        const user = req.user;
        try{
            const newUser = await ClientService.updateClientInfo(Name_Client,Surname_Client,Photo_Client,user);
            return res.status(200).json({newUser});
        } catch (err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async createBookingClient(req,res){
        const {Id_Procedure,Id_Voucher} = req.body;
        const user = req.user;
        try{
            const booking = await ClientService.createBookingClient(Id_Procedure,Id_Voucher,user);
            
            return res.status(200).json({booking});
        } catch (err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async getBookingsClient(req,res){
        const user = req.user;
        try{
            const allBookings = await ClientService.getBookingsClient(user);
            return res.status(200).json({allBookings});
        } catch (err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async createReviewClient(req,res){
        const {Review} = req.body;
        const user = req.user;
        try{
            const review = await ClientService.createReviewClient(Review,user);
            
            return res.status(200).json({review});
        } catch (err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async deleteReviewClient(req,res){
        const user = req.user;
        try{
            const Id_Review = parseInt(req.params.Id_Review,10);
            await ClientService.deleteReviewClient(Id_Review,user);
            
            return res.sendStatus(200);
        } catch (err){
            return ErrorUtils.catchError(res, err);
        }
    }
    static async deleteBookingClient(req,res){
        const user = req.user;
        try{
            const ID_Booking = parseInt(req.params.ID_Booking,10);
            await ClientService.deleteBookingClient(ID_Booking,user);
            
            return res.sendStatus(200);
        } catch (err){
            return ErrorUtils.catchError(res, err);
        }
    }
    
}
export default ClientController;
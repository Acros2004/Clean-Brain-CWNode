import StaticClass from "../static/StaticClass.js";

class SocketService{
    
    static async addUser(userId,socketId){
        const socketUser = await StaticClass.unit.userSocketsRepository.findById(userId);
        if (socketUser.length != 0) {
            await StaticClass.unit.userSocketsRepository.update(socketUser[0].id,{userId,socketId})
        }else {
            await StaticClass.unit.userSocketsRepository.create({ userId, socketId });
        }
    }
    static async deleteUser(socketId){
        await StaticClass.unit.userSocketsRepository.deleteBySocketId(socketId);
    }
    static async checkAndNotify(io){
        console.log("проверка")
        const currentDate = new Date();
        console.log("текущая "+ currentDate);
        const currentTime = currentDate.getTime(); 
        const userSockets = await StaticClass.unit.userSocketsRepository.getAll();
        for(const user of userSockets){
            const bookingsUser = await StaticClass.unit.bookingRepository.findByClientId(user.userId)
            for(const booking of bookingsUser){
                const voucher =  booking.Voucher;
                if(voucher){
                    const voucherStartDateTime = new Date(voucher.Date_Voucher);
                    voucherStartDateTime.setHours(voucher.Time_Voucher_Start.getHours() - 1, voucher.Time_Voucher_Start.getMinutes(), voucher.Time_Voucher_Start.getSeconds());
                    if ( voucherStartDateTime.getTime() < currentTime) {
                        if(user.socketId && io.sockets.sockets.get(user.socketId)){
                            io.to(user.socketId).emit('booking-alert', {
                                ID_Booking: booking.ID_Booking,
                                Name_Procedure: booking.Procedures.Name_Procedure,
                                Time_Start: `${voucher.Time_Voucher_Start.getHours()}:00`
                            });
                        }
                    }
                }
            }
        }
    }
}

export default SocketService;
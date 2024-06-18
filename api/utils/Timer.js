import SocketService from "../services/Socket.js";
export const setTimerNotifyUsers = (io) =>{
    setInterval(() => {
        SocketService.checkAndNotify(io);
      }, 1 * 60000);
}
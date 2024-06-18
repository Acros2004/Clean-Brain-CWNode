import io from "socket.io-client"
import showSocketMessage from "./showSocketMessage";
import config from "../config/config";
import inMemoryJWTService from "../services/inMemoryJWTService";

let socket = "";

export const createSocket = () =>{
    
    socket = io(config.API_URL,{
        extraHeaders: {
            Authorization: `Bearer ${inMemoryJWTService.getToken()}`
        }});

    socket.on('booking-alert', (data) => {
        showSocketMessage(`Ваша процедура ${data.Name_Procedure} начнется в ${data.Time_Start}.`);
    });
    socket.on("connect_error", (err) => {
        console.error(err.message);
    });
    socket.emit('get-user-data');
};
export const disconnectSocket = () =>{
    if(socket)
        return socket.disconnect();
};
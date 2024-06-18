import { createSlice } from "@reduxjs/toolkit";
import { createSocket, disconnectSocket } from "../../utils/socketManager";

const initialState = {
    Id_client : null,
    Name_Client : null,
    Surname_Client : null,
    Photo_Client : null,
    Mail_Client : null,
    Role_Client : null
}

const currentUserSlice = createSlice(
    {
        name: "currentUserState",
        initialState,
        reducers:{
            setCurrentUserState(state,action){ 
                if(action.payload){
                    const {Id_client, Name_Client, Surname_Client,Photo_Client, Mail_Client, Role_Client} = action.payload;
                    state.Id_client = Id_client;
                    state.Name_Client = Name_Client;
                    state.Surname_Client = Surname_Client;
                    state.Photo_Client = Photo_Client;
                    state.Mail_Client = Mail_Client;
                    state.Role_Client = Role_Client;
                    createSocket();
                }
            },
            clearCurrentUserState(state){
                state.Id_client = null;
                state.Name_Client = null;
                state.Surname_Client = null;
                state.Photo_Client = null;
                state.Mail_Client = null;
                state.Role_Client = null;
                disconnectSocket();
            }
        }
    }
)

export const {setCurrentUserState,clearCurrentUserState} = currentUserSlice.actions
export default currentUserSlice.reducer
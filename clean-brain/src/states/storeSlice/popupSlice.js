import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedWindow: "None",
    isActive: false
}

const PopupSlice = createSlice(
    {
        name: "PopupState",
        initialState,
        reducers:{
            setPopupState(state,action){
                if(action.payload)
                    state.selectedWindow = action.payload;
                state.isActive = !state.isActive;
            }
        }
    }
)

export const {setPopupState} = PopupSlice.actions
export default PopupSlice.reducer
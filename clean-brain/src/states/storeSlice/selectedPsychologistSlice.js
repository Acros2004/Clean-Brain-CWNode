import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    psychologist: ""
}

const selectedPsychologistSlice = createSlice(
    {
        name: "currentPsychologistState",
        initialState,
        reducers:{
            setCurrentPsychologistState(state,action){
                state.psychologist = action.payload;
            },
            clearCurrentPsychologistState(state){
                state.psychologist = "";
            }
        }
    }
)

export const {setCurrentPsychologistState,clearCurrentPsychologistState} = selectedPsychologistSlice.actions
export default selectedPsychologistSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    procedure: ""
}

const selectedProcedureSlice = createSlice(
    {
        name: "currentProcedureState",
        initialState,
        reducers:{
            setCurrentProcedureState(state,action){
                state.procedure = action.payload;
            },
            clearCurrentProcedureState(state){
                console.log("Очистили процедуру")
                state.procedure = "";
            }
        }
    }
)

export const {setCurrentProcedureState,clearCurrentProcedureState} = selectedProcedureSlice.actions
export default selectedProcedureSlice.reducer
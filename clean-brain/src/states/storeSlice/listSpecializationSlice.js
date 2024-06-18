import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Spezialization_Name: []
}

const SpecializationSlice = createSlice(
    {
        name: "SpecializationSlice",
        initialState,
        reducers:{
            setSpecializationState(state,action){
                const allSpecializations = action.payload;
                const specializationsNames = allSpecializations.map(specialization => specialization.Spezialization_Name);
                state.Spezialization_Name = specializationsNames;
            }
        }
    }
)

export const {setSpecializationState} = SpecializationSlice.actions
export default SpecializationSlice.reducer
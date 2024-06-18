import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Academic_Name: []
}

const AcademicDegreeSlice = createSlice(
    {
        name: "AcademicDegreeSlice",
        initialState,
        reducers:{
            setAcademicDegreeState(state,action){
                const allAcademicDegrees = action.payload;
                const academicDegreeNames = allAcademicDegrees.map(degree => degree.Academic_Name);
                state.Academic_Name = academicDegreeNames;
            }
        }
    }
)

export const {setAcademicDegreeState} = AcademicDegreeSlice.actions
export default AcademicDegreeSlice.reducer
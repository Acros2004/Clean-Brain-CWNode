import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProceduresFetch } from "../../fetch/ProcedureFetch";

export const getAllProcedures = createAsyncThunk(
    'procedures/getAllProcedures',
    async (_, {rejectWithValue}) => {
        try {
            let proceduresData = [];
            await getAllProceduresFetch().then((res)=>{
                proceduresData = res.data.allProcedures;
            }).catch((error)=> {
                console.error(error);
                throw new Error("Список процедур не получен")
            })
            return proceduresData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const listProceduresSlice = createSlice({
    name: "procedures",
    initialState: {
        procedures: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProcedures.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(getAllProcedures.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.procedures = action.payload;
        });
        builder.addCase(getAllProcedures.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    }
});

export default listProceduresSlice.reducer;

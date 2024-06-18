import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPsychologistsFetch } from "../../fetch/PsychologistFetch";

export const getAllPsychologists = createAsyncThunk(
    'psychologists/getAllPsychologists',
    async (_, {rejectWithValue}) => {
        try {
            let psychologistData = [];
            await getAllPsychologistsFetch().then((res)=>{
                psychologistData = res.data.allPsychologists;
            }).catch((error)=> {
                console.error(error);
                throw new Error("Список психологов не получен")
            })
            return psychologistData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const listPsychologistsSlice = createSlice({
    name: "psychologists",
    initialState: {
        psychologists: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPsychologists.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(getAllPsychologists.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.psychologists = action.payload;
        });
        builder.addCase(getAllPsychologists.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    }
});

export default listPsychologistsSlice.reducer;

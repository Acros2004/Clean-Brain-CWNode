import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllReviewFetch } from "../../fetch/OtherFetch";

export const getAllReviews = createAsyncThunk(
    'reviews/getAllReviews',
    async (_, {rejectWithValue}) => {
        try {
            let reviewsData = [];
            await getAllReviewFetch().then(res=>{
                reviewsData = res.data.allReviews;
            })
            console.log(reviewsData);
            return reviewsData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const listReviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllReviews.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(getAllReviews.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.reviews = action.payload;
        });
        builder.addCase(getAllReviews.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    }
});

export default listReviewsSlice.reducer;

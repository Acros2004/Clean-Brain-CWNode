import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPsychologistsFetch } from "../../fetch/PsychologistFetch";
import { getAllBookingsFetchProtected } from "../../fetch/ProfileFetch";

export const getAllBookings = createAsyncThunk(
    'bookings/getAllBookings',
    async (_, {rejectWithValue}) => {
        try {
            let bookingData = [];
            await getAllBookingsFetchProtected().then((res)=>{
                bookingData = res.data.allBookings;
            }).catch((error)=> {
                console.error(error);
                throw new Error("Список сеансов не получен")
            })
            console.log(bookingData)
            return bookingData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const BookingSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBookings.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(getAllBookings.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.bookings = action.payload;
        });
        builder.addCase(getAllBookings.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    }
});

export default BookingSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import currentUserSliceReducer from "./storeSlice/currentUserSlice" 
import listPsychologistsSlice from "./storeSlice/listPsychologistsSlice";
import listProceduresSlice from "./storeSlice/listProceduresSlice";
import listReviewsSlice from "./storeSlice/listReviewsSlice";
import listAcademicDegreeSlice from "./storeSlice/listAcademicDegreeSlice";
import listSpecializationSlice from "./storeSlice/listSpecializationSlice";
import selectedPsychologistSlice from "./storeSlice/selectedPsychologistSlice";
import popupSlice from "./storeSlice/popupSlice";
import selectedProcedureSlice from "./storeSlice/selectedProcedureSlice";
import listBookingSlice from "./storeSlice/listBookingSlice";

const store = configureStore({
    reducer:{
        currentUserSliceMode : currentUserSliceReducer,
        listPsychologistsSliceMode : listPsychologistsSlice,
        listProceduresSliceMode : listProceduresSlice,
        listReviewsSliceMode : listReviewsSlice,
        listAcademicDegreeMode : listAcademicDegreeSlice,
        listSpecializationMode: listSpecializationSlice,
        selectedPsychologistSliceMode : selectedPsychologistSlice,
        popupSliceMode : popupSlice,
        selectedProcedureSliceMode : selectedProcedureSlice,
        listBookingSliceMode : listBookingSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Отключение проверки сериализуемости
      })
})

export default store;
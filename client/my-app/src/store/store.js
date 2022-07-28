import { configureStore } from "@reduxjs/toolkit";
import BaseSlice from "../slices/BaseSlice";

export const store = configureStore({
  reducer: {
    baseSlice: BaseSlice,
  },
});

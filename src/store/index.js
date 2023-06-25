import { configureStore } from "@reduxjs/toolkit";
import createNote from './slices/createNote.slice'
import isLoading from "./slices/isLoading.slice";
import dataNote from "./slices/dataNote.slice";

export default configureStore({
  reducer: {
    createNote,
    isLoading,
    dataNote
  }
});
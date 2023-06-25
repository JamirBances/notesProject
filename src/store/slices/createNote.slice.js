import { createSlice } from "@reduxjs/toolkit";
import { setIsLoadingGlobal } from "./isLoading.slice";

const createNoteSlice = createSlice({
  name: "createNote",
  initialState: false,
  reducers: {
    setCreateNoteGlobal: (state, action) => {
      return action.payload;
    }
  }
});

export const getCreateNoteThunks = () => dispatch => {
  dispatch(setIsLoadingGlobal(false));
}

export const { setCreateNoteGlobal } = createNoteSlice.actions;

export default createNoteSlice.reducer;
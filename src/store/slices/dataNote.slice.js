import { createSlice } from "@reduxjs/toolkit";

const dataNoteSlice = createSlice({
  name: "dataNote",
  initialState: [{title: "example", content: "oasdkoa"}, {title: "bb", content: "bbrr"}],
  reducers: {
    setDataNoteGlobal: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const getDataNote = () => dispatch => {
  
}

export const { setDataNoteGlobal } = dataNoteSlice.actions;

export default dataNoteSlice.reducer;
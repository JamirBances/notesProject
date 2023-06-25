import { createSlice } from '@reduxjs/toolkit';

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    setIsLoadingGlobal: (state, action) => {
      return action.payload;  
    }
  }
})

export const { setIsLoadingGlobal } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;

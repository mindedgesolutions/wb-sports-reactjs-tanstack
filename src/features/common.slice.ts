import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null as IUser | null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
});
export const { setUser, unsetUser } = commonSlice.actions;
export default commonSlice.reducer;

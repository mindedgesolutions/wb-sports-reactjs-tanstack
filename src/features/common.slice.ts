import { simpleFetch } from '@/axios/refresh.fetch';
import type { RootState } from '@/redux/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null as IUser | null,
  districts: null as IDistrict | null,
  districtsLoading: false as boolean,
};

export const fetchDistricts = createAsyncThunk(
  'fetchDistricts',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.common.districts) {
      return state.common.districts;
    }
    const response = await simpleFetch.get(`/services/districts`);
    return response.data.data;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistricts.pending, (state) => {
        state.districtsLoading = true;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districtsLoading = false;
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state) => {
        state.districtsLoading = false;
      });
  },
});
export const { setUser, unsetUser } = commonSlice.actions;
export default commonSlice.reducer;

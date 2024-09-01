import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PlaceState, Place, FetchPlacesPayload } from '../types';

export const fetchPlaces = createAsyncThunk<Place[], FetchPlacesPayload, { rejectValue: string }>(
  'places/fetchPlaces',
  async ({ hairstyle, region }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/salon/search`, {
        params: { hairstyle, region },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const initialState: PlaceState = {
  items: [],
  loading: false,
  error: null
};

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action: PayloadAction<Place[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetching places failed';
      });
  },
});

export default placeSlice.reducer;
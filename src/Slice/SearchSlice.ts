import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchState, Search } from '../types';

export const fetchRecentSearches = createAsyncThunk<Search[], void, { rejectValue: string }>(
  'searches/fetchRecentSearches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/search/recent-searches', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue('Failed to fetch recent searches');
    }
  }
);

export const deleteSearch = createAsyncThunk<number, number, { rejectValue: string }>(
  'searches/deleteSearch',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/search/recent-searches/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue('Failed to delete search');
    }
  }
);

const initialState: SearchState = {
  items: [],
  loading: false,
  error: null
};

const searchSlice = createSlice({
  name: 'searches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentSearches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentSearches.fulfilled, (state, action: PayloadAction<Search[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecentSearches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch recent searches';
      })
      .addCase(deleteSearch.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteSearch.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete search';
      });
  },
});

export default searchSlice.reducer;

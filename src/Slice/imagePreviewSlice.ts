import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalysisResult } from '../types';

interface ImagePreviewState {
  imageUrl: string | null;
  isLoading: boolean;
  analysisResult: AnalysisResult | null;
}

const initialState: ImagePreviewState = {
  imageUrl: null,
  isLoading: false,
  analysisResult: null,
};

const imagePreviewSlice = createSlice({
  name: 'imagePreview',
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    startAnalysis: (state) => {
      state.isLoading = true;
    },
    setAnalysisResult: (state, action: PayloadAction<AnalysisResult>) => {
      state.isLoading = false;
      state.analysisResult = action.payload;
    },
    resetImageUrl: (state) => {
      state.imageUrl = null;
      state.analysisResult = null;
    },
  },
});

export const { setImageUrl, startAnalysis, setAnalysisResult, resetImageUrl } = imagePreviewSlice.actions;
export default imagePreviewSlice.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import imagePreviewSlice from '../Slice/imagePreviewSlice';
import PlaceSlice from '../Slice/PlaceSlice';
import { PlaceActionTypes } from '../types';
import { Place } from '../types';
import AuthSlice from '../Slice/AuthSlice';
import SearchSlice from '../Slice/SearchSlice';

interface FetchStartAction extends Action {
  type: PlaceActionTypes.FETCH_START;
}

interface FetchSuccessAction extends Action{
  type: PlaceActionTypes.FETCH_SUCCESS;
  payload: Place[];
}

interface FetchFailureAction extends Action {
  type: PlaceActionTypes.FETCH_FAILURE;
  payload: string;
}

export type PlaceAction = FetchStartAction | FetchSuccessAction | FetchFailureAction;

export const store = configureStore({
  reducer: {
    imagePreview: imagePreviewSlice,
    places: PlaceSlice,
    searches: SearchSlice,
    auth: AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// AppThunk 정의
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
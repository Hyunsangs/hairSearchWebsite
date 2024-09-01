import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
};

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  name: string;
}

export const loginUser = createAsyncThunk<User, LoginPayload, { rejectValue: string }>(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      }, {withCredentials: true});
      localStorage.setItem('user', JSON.stringify(response.data.user)); // 로그인 후 사용자 정보 저장
      return response.data.user;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        }
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);



export const registerUser = createAsyncThunk<User, RegisterPayload, { rejectValue: string }>(
  'auth/registerUser',
  async ({ username, password, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
        name,
      }, {withCredentials: true}); // 세션 쿠키를 포함하여 요청
      return response.data.user;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        }
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:8080/auth/logout', {}, {withCredentials: true});
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        }
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        console.log('로그인 성공:', state.user); // 로그인 성공 후 상태 로그
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('user');
        // 쿠키 제거
        document.cookie = 'connect.sid=; Max-Age=0; path=/;';
        document.cookie = 'user_sid=; Max-Age=0; path=/;';
        console.log('로그아웃 성공: 상태 초기화 및 쿠키 삭제'); // 로그아웃 성공 후 상태 로그
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

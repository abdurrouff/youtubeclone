import { configureStore } from '@reduxjs/toolkit';
import videoReducer from '../features/video/videoSlice';
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    video: videoReducer,
    user: userReducer,
  },
});

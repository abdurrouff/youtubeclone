import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { setVideos } = videoSlice.actions;

export const selectVideos = (state) => state.video.videos;

export default videoSlice.reducer;

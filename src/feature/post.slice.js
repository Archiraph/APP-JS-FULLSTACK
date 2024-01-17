import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://app-js-fullstack.vercel.app/post/"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    postsData: [],
  },
  reducers: {
    getPostsSuccess: (state, { payload }) => {
      state.postsData = payload;
    },
    createPost: (state, { payload }) => {
      state.postsData.push(payload);
    },
    editPost: (state, { payload }) => {
      state.postsData = state.postsData.map((post) => {
        if (post._id === payload[1]) {
          return {
            ...post,
            message: payload[0],
          };
        } else {
          return post;
        }
      });
    },
    deletePost: (state, { payload }) => {
      state.postsData = state.postsData.filter((post) => post._id !== payload);
    },
    like: (state, { payload }) => {
      state.postsData = state.postsData.map((post) => {
        if (post._id === payload[1]) {
          return {
            ...post,
            likers: [...post.likers, payload[0]],
          };
        } else {
          return post;
        }
      });
    },
    dislike: (state, { payload }) => {
      state.postsData = state.postsData.map((post) => {
        if (post._id === payload[1]) {
          return {
            ...post,
            likers: post.likers.filter((userId) => userId !== payload[0]),
          };
        } else {
          return post;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postsData = action.payload;
    });
  },
});

export const {
  getPostsSuccess,
  createPost,
  editPost,
  deletePost,
  like,
  dislike,
} = postSlice.actions;
export default postSlice.reducer;

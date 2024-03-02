import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store'; // Adjust the path accordingly
import followCourseService from './followCourseService';

interface FollowCourseState {
  courses: any[]; // Replace 'any' with the actual type of your courses
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: FollowCourseState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

interface AddFavoriteCourseData {
  user_id: string;
  course_id: string;
}

export const addFavoriteCourse = createAsyncThunk(
  'followCourse/create',
  async (data: AddFavoriteCourseData, thunkAPI) => {
    try {
      return await followCourseService.addFavoriteCourse(data.user_id, data.course_id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface GetFavoriteCoursesData {
  user_id: string;
}

export const getFavoriteCourses = createAsyncThunk(
  'followCourse/create',
  async (data: GetFavoriteCoursesData, thunkAPI) => {
    try {
      return await followCourseService.getFavoriteCourses(data.user_id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface DeleteFavoriteCourseData {
  user_id: string;
  course_id: string;
}

export const deleteFavoriteCourse = createAsyncThunk(
  'followCourse/create',
  async (data: DeleteFavoriteCourseData, thunkAPI) => {
    try {
      return await followCourseService.deleteFavoriteCourse(data.user_id, data.course_id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const followCourseSlice = createSlice({
  name: 'followCourse',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteCourse.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(addFavoriteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses.push(action.payload);
      })

      .addCase(addFavoriteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getFavoriteCourses.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getFavoriteCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })

      .addCase(getFavoriteCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteFavoriteCourse.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteFavoriteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      })

      .addCase(deleteFavoriteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = followCourseSlice.actions;
export default followCourseSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://randomuser.me/api/?results=1"

const fetchUsersAsync = createAsyncThunk("users/fetchUsers", async () => {
  try {
    // Place your fetching logic here (e.g., using Axios to make an API request)
    const response = await axios.get(API_URL); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    // If an error occurs, pass it to rejectWithValue
    return Promise.reject(error.response.data); // Assuming you want to pass error data back
  }
});

const initialState = {
  users: [],
  isLoading: true,
  error: undefined,
};

export const usersSlice = createSlice({
  name: "APK",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        // In the pending state, mutate isLoading to true
        state.isLoading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        // In the fulfilled state, mutate isLoading to false and assign payload to users
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        // In the rejected state, mutate isLoading to false and assign an error message
        state.isLoading = false;
        state.error = action.error.message; // Assuming you pass error message with `rejectWithValue`
      });
  },
});

// export const { increment, decrement, incrementByAmount } = usersSlice.actions
export { fetchUsersAsync };
export default usersSlice.reducer;

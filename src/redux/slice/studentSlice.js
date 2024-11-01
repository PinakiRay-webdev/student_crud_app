import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:3000/students";

const initialState = {
  studentList: [],
  isLoading: false,
  isError: false,
};

// Read a student 
export const getUser = createAsyncThunk("getUser", async () => {
  try {
    const response = await axios.get(base_url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// Create a student 
export const createUser = createAsyncThunk("createUser", async (newUser) => {
  const response = await axios.post(base_url, newUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

// Delete a student
export const deleteStudent = createAsyncThunk("deleteStudent", async (userID) => {
  try {
    await axios.delete(`${base_url}/${userID}`);
    return userID;
  } catch (error) {
    console.log(error);
  }
});

// Edit a student
export const editUser = createAsyncThunk("editUser", async (updatedUser) => {
  const response = await axios.patch(`${base_url}/${updatedUser.id}`, updatedUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentList = [...state.studentList, action.payload];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("Error : " + action.error.message);
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentList = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("Error : " + action.error.message);
      });

    builder
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentList = state.studentList.filter((user) => user.id !== action.payload);
        state.isError = false;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("Error : " + action.error.message);
      });

    builder
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.studentList.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.studentList[index] = action.payload; // Update the user in the state
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("Error : " + action.error.message);
      });
  },
});

export default studentSlice.reducer;

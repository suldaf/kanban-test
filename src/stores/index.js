import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://todos-project-api.herokuapp.com";

export const getListTask = createAsyncThunk(
  "tasks/get",
  async (payload, thunkAPI) => {
    const { todoId, token } = payload;
    const { data } = await axios.get(BASE_URL + "/todos/" + todoId + "/items", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);
export const getListTodos = createAsyncThunk(
  "todos/get",
  async (token, thunkAPI) => {
    const { data } = await axios.get(BASE_URL + "/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

const todos = createSlice({
  name: "todos",
  initialState: {
    data: [],
    tasksByid: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTodos.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(getListTask.fulfilled, (state, action) => {
        state.tasksByid[action.meta.arg.todoId] = [...action.payload];
      });
  },
});

const store = configureStore({
  reducer: { todos: todos.reducer },
});

export default store;

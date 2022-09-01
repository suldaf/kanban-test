import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://todos-project-api.herokuapp.com";

const getListTask = createAsyncThunk("tasks/get", async (payload, thunkAPI) => {
  const { todoId, token } = payload;
  const { data } = await axios.get(BASE_URL + "/todos/" + todoId + "/items", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
});

export const getListTodos = createAsyncThunk(
  "todos/get",
  async (token, thunkAPI) => {
    const { data } = await axios.get(BASE_URL + "/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const mappedPromise = data.map((e) =>
      axios.get(BASE_URL + "/todos/" + e.id + "/items", {
        headers: { Authorization: `Bearer ${token}` },
      })
    );
    const responses = await Promise.all(mappedPromise);
    const mappedResponses = data.map((e) => {
      responses.forEach((el) => {
        if (el.config.url.includes(e.id)) {
          e["listTask"] = el.data;
        }
      });
      return e;
    });
    console.log(mappedResponses);
    return data;
  }
);

const todos = createSlice({
  name: "todos",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getListTodos.fulfilled, (state, action) => {
      state.data = [...action.payload];
    });
  },
});

const store = configureStore({
  reducer: { todos: todos.reducer },
});

export default store;

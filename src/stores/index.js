import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://todos-project-api.herokuapp.com";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NTksImV4cCI6MTY2MjI3NTUxNH0.f8xvWeJsLr9_GCeyKs2R45vIp-kawGYyFMCCA-E7cPI";

export const getListTodos = createAsyncThunk("todos/get", async () => {
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
  return mappedResponses;
});

export const postTodo = createAsyncThunk(
  "todos/post",
  async (payload, thunkAPI) => {
    const { data } = payload;
    await axios.post(BASE_URL + "/todos", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    thunkAPI.dispatch(getListTodos());
  }
);

export const getTask = createAsyncThunk("task/get", async (payload) => {
  const { todoId, taskId } = payload;
  const { data } = await axios.get(
    BASE_URL + "/todos/" + todoId + "/items/" + taskId,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
});
export const postTask = createAsyncThunk(
  "task/post",
  async (payload, thunkAPI) => {
    const { todoId, data } = payload;
    await axios.post(BASE_URL + "/todos/" + todoId + "/items/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    thunkAPI.dispatch(getListTodos());
  }
);
export const deleteTask = createAsyncThunk(
  "task/delete",
  async (payload, thunkAPI) => {
    const { todoId, taskId } = payload;
    await axios.delete(BASE_URL + "/todos/" + todoId + "/items/" + taskId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    thunkAPI.dispatch(getListTodos());
  }
);
export const patchTask = createAsyncThunk(
  "task/patch",
  async (payload, thunkAPI) => {
    const { todoId, taskId, data } = payload;
    await axios.patch(
      BASE_URL + "/todos/" + todoId + "/items/" + taskId,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    thunkAPI.dispatch(getListTodos());
  }
);

const todos = createSlice({
  name: "todos",
  initialState: {
    data: [],
    taskById: {},
  },
  reducers: {
    resetTask(state) {
      state.taskById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTodos.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(getTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.taskById = action.payload;
      });
  },
});
export const { resetTask } = todos.actions;
const store = configureStore({
  reducer: { todos: todos.reducer },
});

export default store;

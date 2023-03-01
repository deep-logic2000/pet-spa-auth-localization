import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { Inew } from "../../pages/News/News";

type INewsState = {
  news: Inew[];
  isLoading: boolean;
  error?: string;
  currentPage: number;
  totalNewsCount: number;
  countOfDeletedNews: number;
};

interface IError {
  errorMessage: string | null;
}

const initialState = {
  news: [],
  isLoading: false,
  error: "",
  currentPage: 1,
  totalNewsCount: 0,
  countOfDeletedNews: 0,
} as INewsState;

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (arg: number, thunkAPI) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=20&_page=${arg}`
    );
    const data = await response.json();

    const totalNewsCount = response.headers.get("x-total-count");
    thunkAPI.dispatch(
      newsReducer.actions.totalNewsCount(Number(totalNewsCount))
    );
    if (response.status === 400) {
      return thunkAPI.rejectWithValue((await response.json()) as string);
    }
    if (response.status === 404) {
      return thunkAPI.rejectWithValue("Bad request");
    }

    return data as Inew[];
  }
);

export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id: number, thunkAPI) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      return thunkAPI.rejectWithValue((await response.json()) as IError)
    }

    return id;
  }
);

export const newsReducer = createSlice({
  name: "news",
  initialState,
  reducers: {
    totalNewsCount: (state, action: PayloadAction<number>) => {
      state.totalNewsCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNews.fulfilled,
      (state, action: PayloadAction<Inew[]>) => {
        state.news = [...state.news, ...action.payload];
        state.isLoading = false;
        state.currentPage += 1;
      }
    );
    builder.addCase(fetchNews.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Something went wrong... Please try again later.";
    });
    builder.addCase(
      deleteNews.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.news = [...state.news].filter(item => item.id !== action.payload);
        state.countOfDeletedNews += 1;
        state.isLoading = false;
      }
    );
    builder.addCase(deleteNews.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
  },
});


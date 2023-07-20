import { ICategory } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICategoryState extends Array<ICategory> {}

const slice = createSlice({
  name: "categories",
  initialState: [] as ICategoryState,
  reducers: {
    add(state, payload: PayloadAction<ICategory>) {
      state.push(payload.payload);
    },
  },
});

export default slice;

export const { add } = slice.actions;

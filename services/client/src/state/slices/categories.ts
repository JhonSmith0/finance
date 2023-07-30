import { ICategory, ICategoryUpdate } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICategoryState {
  editing: ICategory | null;
  categories: ICategory[];
}

const slice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    editing: null,
  } as ICategoryState,
  reducers: {
    setEditing(state, { payload }: PayloadAction<ICategory | null>) {
      state.editing = payload;
    },
    update(state, payload: PayloadAction<ICategoryUpdate>) {
      const index = state.categories.findIndex(
        (e) => e.id === payload.payload.id
      );
      if (index < 0) return;
      const obj = state.categories[index];
      state.categories[index] = { ...obj, ...payload.payload };
    },
    add(state, payload: PayloadAction<ICategory>) {
      state.categories.push(payload.payload);
    },
    remove(state, payload: PayloadAction<ICategory["id"]>) {
      const index = state.categories.findIndex((e) => e.id === payload.payload);
      if (index < 0) return;
      if (state.editing?.id === payload.payload) state.editing = null;
      state.categories.splice(index, 1);
    },
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
  },
});

export default slice;

export const { add, remove, setEditing, update, setCategories } = slice.actions;

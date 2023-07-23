import { IUser } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  user: IUser | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as IState,
  reducers: {
    setUser(state, action: PayloadAction<IState["user"]>) {
      state.user = action.payload;
    },
  },
});

export default userSlice;

export const { setUser } = userSlice.actions;

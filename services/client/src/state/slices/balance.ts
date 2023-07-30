import { IBalance } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Empty<T> = {
  [K in keyof T]: {
    value: T[K] | null;
  };
};

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: {
      value: null,
    },
    expense: {
      value: null,
    },
    income: {
      value: null,
    },
  } as Empty<IBalance>,
  reducers: {
    setBalance(state, action: PayloadAction<IBalance>) {
      state.balance.value = action.payload.balance;
      state.expense.value = action.payload.expense;
      state.income.value = action.payload.income;
    },
  },
});

export default balanceSlice;

export const { setBalance } = balanceSlice.actions;

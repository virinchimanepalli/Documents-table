import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  login: boolean;
}

const initialState: Pick<
  Account,
  "firstName" | "lastName" | "email" | "login"
> = {
  firstName: "",
  lastName: "",
  email: "",
  login: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Account>) => {
      const { firstName, lastName, email, login } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.login = login;
    },
    logoutUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.login = false;
    },
  },
});
export const { addUser, logoutUser } = accountSlice.actions;

export default accountSlice.reducer;

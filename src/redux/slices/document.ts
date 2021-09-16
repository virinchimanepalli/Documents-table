import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Document {
  name: string;
  title: string;
  createdDate: string;
  email: string;
}

const initialState: Pick<Document, "name" | "title" | "createdDate" | "email"> =
  {
    name: "",
    title: "",
    createdDate: "",
    email: "",
  };

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    viewDoc: (state, action: PayloadAction<Document>) => {
      const { name, title, createdDate, email } = action.payload;
      state.name = name;
      state.title = title;
      state.email = email;
      state.createdDate = createdDate;
    },
  },
});
export const { viewDoc } = documentSlice.actions;

export default documentSlice.reducer;

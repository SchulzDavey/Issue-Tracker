import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type listProps = {
  listOrder: string;
};

const initialState: listProps = {
  listOrder: 'asc',
};

export const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setListOrder: (state, actions: PayloadAction<string>) => {
      state.listOrder = actions.payload;
    },
  },
});

export const { setListOrder } = list.actions;
export default list.reducer;

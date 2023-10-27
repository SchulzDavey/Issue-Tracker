import { Status } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateProps = {
  value: IssueProps;
};

type IssueProps = {
  status: Status;
};

const initialState = {
  value: {
    status: 'OPEN',
  },
} as initialStateProps;

export const issue = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    setIssueStatus: (state, action: PayloadAction<any>) => {
      return {
        value: {
          status: action.payload,
        },
      };
    },
  },
});

export const { setIssueStatus } = issue.actions;
export default issue.reducer;

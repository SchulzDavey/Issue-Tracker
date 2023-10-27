'use client';

import { PropsWithChildren } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';

const ReduxProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

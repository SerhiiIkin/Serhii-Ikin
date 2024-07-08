import { Provider } from 'react-redux';

import { ReactQueryClientProvider } from '@providers/ReactQueryClientProvider';

import AppRouter from '@routes/AppRoute';

import { store } from '@store/store.ts';

const App = () => {
  return (
    <Provider store={store}>
      <ReactQueryClientProvider>
        <AppRouter />
      </ReactQueryClientProvider>
    </Provider>
  );
};

export default App;

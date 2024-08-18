import { Provider } from 'react-redux';

import AppRouter from '@routes/AppRoute';

import { store } from '@store/store.ts';

import { ReactQueryClientProvider } from '@providers/ReactQueryClientProvider';

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

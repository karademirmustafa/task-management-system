import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import history from './history';
import store, { persistor } from './store';
import Layout from 'components/layout';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter history={history}>
          <Layout />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

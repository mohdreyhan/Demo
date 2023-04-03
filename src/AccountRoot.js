import { Provider } from 'react-redux';
import store from './Store/Store';
import Home from './Home';
import { Theme } from '@oasis/react-mui-theme';
import { ThemeProvider } from '@oasis/react-core';
import './index.css';

export default function AccountRoot() {
  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <Home />
      </Provider>
    </ThemeProvider>
  );
}

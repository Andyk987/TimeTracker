import {} from 'styled-components/cssprop';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import GlobalStyles from './styles/global-styles';
import { store } from './app/store';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

var mountNode = document.getElementById('popup');
ReactDOM.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </>,
  mountNode
);

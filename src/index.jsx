import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ThemeProvider from 'components/Theme/ThemeProvider';
import store from './store/index';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

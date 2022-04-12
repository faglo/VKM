import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store"
import {Provider} from 'react-redux'

import VKSans from "url:../public/fonts/vk-sans.woff"
import VKSansWoff2 from "url:../public/fonts/vk-sans.woff2"
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077ff',
      dark: "#0077ff",
      light: "#0077ff"
    }
  },
  typography: {
    fontFamily: 'VK Sans Display',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face{
        font-family:"VK Sans Display";
        src:url(${VKSansWoff2})
        format("woff2"),url(${VKSans})
        format("woff");
        font-weight:500;
        font-display:fallback
      }`,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App />
        </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

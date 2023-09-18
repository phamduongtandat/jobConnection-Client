import React from 'react';
import ReactDOM from 'react-dom/client';
//
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//
import 'swiper/css';
import 'swiper/css/pagination';
import App from './App.jsx';
import { QueryClientProvider, queryClient } from './config/react-query.js';
import ContextProvider from './contexts/index.jsx';
import './index.css';
import { store } from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ContextProvider>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </ContextProvider>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>,
);

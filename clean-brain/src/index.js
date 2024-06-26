import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import state from './states/store'
import { Provider } from 'react-redux';
import AuthProvider from './context/AuthContext';
import { SnackbarProvider } from 'notistack';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={state}>
    <React.StrictMode>
      <SnackbarProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>
);


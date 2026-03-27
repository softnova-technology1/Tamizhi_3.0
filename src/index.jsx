import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import ContextProvider from './Context/contextApi';
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_ID = `50280701300-n5srdl9i8ms5khl30db19goil9bkg2bf.apps.googleusercontent.com`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </GoogleOAuthProvider>,
);

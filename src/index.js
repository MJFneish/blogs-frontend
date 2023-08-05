import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import AppWrapper from './components/common/NavBar/AppWrapper';

function AppRoot() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppWrapper />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<AppRoot />);

reportWebVitals();
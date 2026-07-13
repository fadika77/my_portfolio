import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ReducedMotionProvider } from '@/providers/ReducedMotionProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ReducedMotionProvider>
          <App />
        </ReducedMotionProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);

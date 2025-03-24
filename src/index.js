import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { HelmetProvider } from "react-helmet-async";

import './index.scss';

import App from '@/App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
      <HelmetProvider>
          <BrowserRouter>
              <Suspense>
                  <App />
              </Suspense>
          </BrowserRouter>
      </HelmetProvider>
  // </React.StrictMode>
);



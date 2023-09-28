import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './HomePage';
import { InfoPage } from './InfoPage';
import { LockupPage } from './lockup/LockupPage';
import { DecodePage } from './DecodePage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/info',
      element: <InfoPage />,
    },
    {
      path: '/lockup',
      element: <LockupPage />,
    },
    {
      path: '/decode',
      element: <DecodePage />,
    },
  ],
  {
    basename: '/lockup-ui/',
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

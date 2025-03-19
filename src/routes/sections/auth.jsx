import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import GuestGuard from '@auth/guard/guest-guard';
import AuthClassicLayout from '@layouts/auth/classic';


// JWT
const JwtLoginPage = lazy(() => import('@pages/auth/jwt/login'));

const authJwt = {
    path: 'jwt',
    element: (
      <GuestGuard>
        <Outlet />
      </GuestGuard>
    ),
    children: [
      {
        path: 'login',
        element: (
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        ),
      }
    ],
  };


export const authRoutes = [
    {
      path: 'auth',
      children: [authJwt],
    },
  ];
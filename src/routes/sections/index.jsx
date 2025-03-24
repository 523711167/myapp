import { useRoutes, Navigate } from 'react-router-dom';

import { authRoutes } from '@routes/sections/auth';
import { mainRoutes } from "@routes/sections/main";

import { PATH_AFTER_LOGIN } from '@/config-global';
import {dashboardRoutes} from "@routes/sections/dashboard";

function Routes() {
    return useRoutes([
        {
          path: '/',
          element: <Navigate to={PATH_AFTER_LOGIN} replace />,
        },
    
        // Auth routes
        ...authRoutes,
    
        // Dashboard routes
        ...dashboardRoutes,
    
        // Main routes
        ...mainRoutes,
    
        // No match 404
        { path: '*', element: <Navigate to="/404" replace /> },
      ]);
}

export default Routes;

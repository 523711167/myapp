import { useRoutes, Navigate } from 'react-router-dom';

import { PATH_AFTER_LOGIN } from '@/config-global';



function Routes() {
    return useRoutes([
        {
          path: '/',
          element: <Navigate to={PATH_AFTER_LOGIN} replace />,
        },
    
        // Auth routes
        ...authRoutes,
    
        // Dashboard routes
        // ...dashboardRoutes,
    
        // Main routes
        // ...mainRoutes,
    
        // No match 404
        { path: '*', element: <Navigate to="/404" replace /> },
      ]);
}

export default Routes;

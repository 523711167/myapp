import { Outlet } from "react-router-dom";
import { lazy } from "react";

const NotFindView = lazy(() => import('@sections/error/not-find-view'))

export const mainRoutes = [
    {
        element: (
            <Outlet />
        ),
        children: [{ path: '404', element: <NotFindView /> }],
    },
]
